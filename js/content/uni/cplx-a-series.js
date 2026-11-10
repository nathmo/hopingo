// c-taylor, c-laurent, c-singularities (module C, part a, step U10).
//
// Series written with Σ are judged by cvalue on the real axis inside the
// disc or the annulus (an analytic function is fixed by its values on a
// segment): 6 points of a segment of the annulus, the Σ summed
// numerically; a series that diverges there is wrong (c_laurent_wrong_
// annulus is compared where it converges, cfg.alt). Final form 'series':
// Σ of c·zᵏ terms (or powers of 1/z, of z − 1), no 1/(1 − w) left.
// c-taylor: 1/(a + z²), 1/(a ± z), 1/(1 + az), z/(1 − z)²: geometric form,
// Σ, radius (the distance to the nearest singularity); a₀…a₃ of a
// quotient (judge series, GM 2015) at level 4; coefficient aₖ (coef).
// c-laurent: f = 1/((z − a)(z − b)) or 1/(z(z − a)), a, b real: partial
// fractions (cvalue, final 'pfd'), each 1/(z − c) in powers of z or of
// 1/z, the sum; at level 4 also around z₀ = 1. Coefficients (coef) from
// the exact expansions, and of e^(1/z), z² sin(1/z).
// c-singularities: p/q at z₀ with p, q of known zero orders (checked with
// singularityType of js/cas/series.js): the orders by the series judge
// (around h = z − a when z₀ = a ≠ 0), the nature (decision), the order
// of the pole (cvalue, c_order_pole_numerator). Essential singularities
// (e^(1/z), z² sin(1/z), sin(1/(1 − 2z))) in multiple choice.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { series, singularityType } from '../../cas/series.js';
import {
  q, M, rd, joinT, term, CV, KEYS_SUM, linesOf, choice, opt, H, examTag, problemItem, answerItem, pickK,
} from './cplx-a-kit.js';

const eq = (math, note, subgoal, blank) => ({ math, note, subgoal, blank });
const KEYS = KEYS_SUM;
const ZV = ['z', 'n'];
const zcfg = (dom, extra = {}) => CV({ vars: ZV, real: ['z'], domain: { z: dom }, ...extra });
const qs = (x) => String(q(x));
// c^(n+1) as text with brackets for a negative or fractional c.
const powT = (c, e) => (q(c).n < 0 || q(c).d !== 1 ? `(${qs(c)})^${e}` : `${qs(c)}^${e}`);

// ======================================================================
// c-taylor
// ======================================================================

const TA = 'c-taylor';
const TA_SUB = [
  { id: 'geometric', label: 'forme 1/(1 − w)', skill: 'a1-ser-geo-tele' },
  { id: 'general-term', label: 'terme général', skill: TA },
  { id: 'radius', label: 'rayon de convergence', skill: 'a1-pow-domain' },
];

// {f, geo (1/(1 − w) form), sumW, term (Σ final), R (text), Rv, pole, wrongR, wrongSign?}
function taData(rng) {
  const kind = rng.pick(['sq', 'sq', 'minus', 'plus', 'lin', 'deriv']);
  const a = rng.pick([2, 3, 4]);
  if (kind === 'sq') {
    const neg = rng.chance(0.3);
    const R = a === 4 ? '2' : `√${a}`;
    return {
      kind, f: `1/(${a}${neg ? '-' : '+'}z^2)`, geo: `(1/${a})·1/(1-(${neg ? '' : '-'}z^2/${a}))`,
      sumW: `(1/${a})sum((${neg ? '' : '-'}z^2/${a})^n, n, 0, ∞)`,
      term: neg ? `sum(z^(2n)/${a}^(n+1), n, 0, ∞)` : `sum((-1)^n z^(2n)/${a}^(n+1), n, 0, ∞)`,
      wrongSign: neg ? null : `sum(z^(2n)/${a}^(n+1), n, 0, ∞)`,
      R, Rv: Math.sqrt(a), pole: neg ? `±${R}` : `±i${R === '2' ? '·2' : R}`.replace('i·2', '2i'), wrongR: String(a), key: `sq:${a}:${neg}`,
    };
  }
  if (kind === 'minus' || kind === 'plus') {
    const m = kind === 'minus';
    return {
      kind, f: `1/(${a}${m ? '-' : '+'}z)`, geo: `(1/${a})·1/(1-(${m ? '' : '-'}z/${a}))`,
      sumW: `(1/${a})sum((${m ? '' : '-'}z/${a})^n, n, 0, ∞)`,
      term: m ? `sum(z^n/${a}^(n+1), n, 0, ∞)` : `sum((-1)^n z^n/${a}^(n+1), n, 0, ∞)`,
      wrongSign: m ? null : `sum(z^n/${a}^(n+1), n, 0, ∞)`,
      R: String(a), Rv: a, pole: m ? String(a) : `−${a}`, wrongR: String(a * a), key: `${kind}:${a}`,
    };
  }
  if (kind === 'lin') {
    const b = rng.pick([2, 3]);
    return {
      kind, f: `1/(1+${b}z)`, geo: `1/(1-(-${b}z))`, sumW: `sum((-${b}z)^n, n, 0, ∞)`,
      term: `sum((-${b})^n z^n, n, 0, ∞)`, wrongSign: `sum(${b}^n z^n, n, 0, ∞)`,
      R: `1/${b}`, Rv: 1 / b, pole: `−1/${b}`, wrongR: String(b), key: `lin:${b}`,
    };
  }
  return {
    kind, f: 'z/(1-z)^2', geo: 'z·d(1/(1-z), z)', sumW: 'z·sum(n·z^(n-1), n, 1, ∞)', term: 'sum(n·z^n, n, 1, ∞)', wrongSign: null,
    R: '1', Rv: 1, pole: '1', wrongR: '2', key: 'deriv',
  };
}

const TA_MENU = (right) => [
  { id: 'geo', label: 'Faire apparaître 1/(1 − w), w → 0' },
  { id: 'sum', label: '1/(1 − w) = Σ wⁿ, puis simplifier le terme général' },
  { id: 'radius', label: 'Rayon : distance de 0 à la singularité la plus proche' },
  { id: 'deriv', label: 'Calculer f⁽ⁿ⁾(0) pour chaque n', why: 'Juste en principe, mais bien plus long que la série géométrique.' },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || 'Ce n\'est pas l\'étape à faire maintenant.' }));

function taParts(d, level) {
  const dom = [-0.6 * d.Rv, 0.6 * d.Rv];
  const parts = [];
  if (level >= 2) {
    parts.push({
      html: d.kind === 'deriv' ? 'z/(1 − z)² = z · (1/(1 − z))′ :' : 'On fait apparaître la série géométrique :', start: d.f, judge: zcfg(dom, { final: 'any' }),
      decisions: [{
        kind: 'decision', prompt: 'Quelle méthode ?', levels: [3], options: [
          { id: 'geo', label: 'Série géométrique 1/(1 − w) = Σ wⁿ', valid: true, ref: true },
          { id: 'dl', label: 'DL usuel', valid: false, why: 'Aucun DL usuel ne donne directement cette fraction : passe par 1/(1 − w).' },
          { id: 'deriv', label: 'Dérivées en 0 : aₙ = f⁽ⁿ⁾(0)/n!', valid: true, quality: 'poor', why: 'Juste, mais le terme général se lit bien plus vite avec la série géométrique.' },
        ],
      }],
      lines: [eq(d.geo, d.kind === 'deriv' ? '' : 'mettre en facteur', 'geometric', [d.geo.split('·').pop()])], menu: TA_MENU('geo'),
    });
  }
  parts.push({
    html: level === 1 ? `On a ${M(`${d.f} = ${d.geo}`)}.` : 'Le terme général :', ask: `${rd(d.f)} =`, start: d.geo,
    judge: zcfg(dom, { final: 'series', traps: d.wrongSign ? { c_laurent_sign: [d.wrongSign] } : {} }),
    lines: [eq(d.sumW, '1/(1 − w) = Σ wⁿ', 'general-term', [d.sumW.replace(/^.*sum\(/, '').split(', n')[0]]), eq(d.term, 'simplifier le terme général', 'general-term', [d.term.replace(/^sum\(/, '').split(', n')[0]])],
    menu: TA_MENU('sum'),
  });
  parts.push({
    html: `La singularité la plus proche de 0 est ${rd(d.pole)} :`, ask: 'R =', start: 'R',
    judge: CV({ raw: { text: 'R', html: M('R') }, expect: d.R, final: 'number', traps: { c_taylor_radius: [{ line: d.wrongR, ctx: { z0: '0', pole: rd(d.pole), R: rd(d.R) } }] } }),
    lines: [eq(d.R, 'distance de 0 à la singularité', 'radius', [d.R])], menu: TA_MENU('radius'),
  });
  return parts;
}

function taLines(level, rng, opts) {
  const d = taData(rng);
  return linesOf({
    level, skill: TA, key: `${TA}:${level}:${d.key}`, keys: KEYS, subgoals: TA_SUB, exam: examTag(opts, 3),
    prompt: `Développe ${M(`f(z) = ${d.f}`)} en série de Taylor en 0 (terme général), puis donne le rayon de convergence.`,
    parts: taParts(d, level),
    hints: H('Fais apparaître 1/(1 − w) avec w → 0, puis 1/(1 − w) = Σ wⁿ pour |w| < 1.', M(d.geo), M(d.term)),
  });
}

// a₀ … a₃ of a quotient (GM 2015), judge series.
const QUOT = ['1/(sin(z)+2cos(z)-3)', 'e^z/(1-z)', 'cos(z)/(1-z)', 'e^z/(1+z)', '1/(2-e^z)', 'sin(z)/(1-z)', '(1+z)/(1-2z)'];
function coefsOf(f, order = 3) {
  const s = series(parse(f, { vars: ['z'] }), 'z', 0, order + 1);
  return Array.from({ length: order + 1 }, (_, k) => s.coef(k));
}
function dlText(cs) {
  const ts = cs.map((c, k) => (q(c).n === 0 ? '' : term(c, k === 0 ? '' : k === 1 ? 'z' : `z^${k}`)));
  return `${joinT(ts)}+o(z^${cs.length - 1})`;
}
function taQuotient(level, rng, opts) {
  const f = rng.pick(QUOT);
  const cs = coefsOf(f);
  const line = dlText(cs);
  return linesOf({
    level, skill: TA, key: `${TA}:${level}:quot:${f}`, keys: KEYS, subgoals: TA_SUB, exam: examTag(opts, 3),
    prompt: `Donne a₀, a₁, a₂, a₃ de la série de Taylor en 0 de ${M(`f(z) = ${f}`)}, sous la forme a₀ + a₁z + a₂z² + a₃z³ + o(z³).`,
    parts: [{ start: f, judge: { kind: 'series', v: 'z', at: 0, order: 3 }, lines: [eq(line, 'DL des deux fonctions, puis 1/(1 − u) = 1 + u + u² + u³ + o(u³)', 'general-term')] }],
    hints: H('Développe le numérateur et le dénominateur à l\'ordre 3, puis divise (1/(1 − u) = 1 + u + u² + …).', `a₀ = ${rd(qs(cs[0]))}`, M(line)),
  });
}

function taCoef(level, rng, opts) {
  const f = rng.pick(QUOT);
  const k = rng.pick([2, 3]);
  const c = coefsOf(f)[k];
  return answerItem({
    skill: TA, level, key: `${f}:${k}`, exam: examTag(opts, 2),
    prompt: `Série de Taylor en 0 de ${M(`f(z) = ${f}`)} : a${k === 2 ? '₂' : '₃'} = ?`,
    expected: qs(c), solution: [{ html: `${M(`f(z) = ${dlText(coefsOf(f))}`)}`, note: '' }],
  });
}

function taMcq(level, rng, opts) {
  if (opts.multi) {
    const pool = [
      { html: `${M('1/(1-z) = sum(z^n, n, 0, ∞)')}, |z| < 1`, truth: true },
      { html: `${M('1/(1+z) = sum(z^n, n, 0, ∞)')}, |z| < 1`, truth: false, rule: 'c_laurent_sign' },
      { html: `${M('1/(1+z) = sum((-1)^n z^n, n, 0, ∞)')}, |z| < 1`, truth: true },
      { html: `${M('sin(z)/z = sum((-1)^n z^(2n)/(2n+1)!, n, 0, ∞)')}, z ≠ 0`, truth: true },
      { html: `${M('sin(z)/z = sum(z^(2n)/(2n+1)!, n, 0, ∞)')}, z ≠ 0`, truth: false, rule: 'c_laurent_sign' },
      { html: `le rayon de convergence en 0 de ${M('1/(3+z^2)')} vaut 3`, truth: false, rule: 'c_taylor_radius' },
      { html: `le rayon de convergence en 0 de ${M('1/(3+z^2)')} vaut √3`, truth: true },
    ];
    const s = pickK(rng, pool, 5);
    if (!s.some((x) => x.truth)) s[0] = pool[0];
    return choice({ skill: TA, level, multi: true, key: `multi:${s.map((x) => pool.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: 'Cochez les développements et rayons justes.', options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  const d = taData(rng);
  if (rng.chance(0.5) || !d.wrongSign) {
    return choice({
      skill: TA, level, key: `mcq:R:${d.key}`, exam: examTag(opts, 2),
      prompt: `Le rayon de convergence de la série de Taylor en 0 de ${M(`f(z) = ${d.f}`)} est :`,
      right: M(d.R), wrongs: [opt(d.wrongR, 'c_taylor_radius'), opt('∞'), opt('1'), opt(d.R === '2' ? '4' : '1/2')],
      solution: [{ html: `La singularité la plus proche de 0 est ${rd(d.pole)}, à distance ${rd(d.R)}.`, note: '' }],
    }, rng);
  }
  return choice({
    skill: TA, level, key: `mcq:S:${d.key}`, exam: examTag(opts, 2),
    prompt: `La série de Taylor en 0 de ${M(`f(z) = ${d.f}`)} est :`,
    right: M(d.term), wrongs: [opt(d.wrongSign, 'c_laurent_sign'), opt(d.term.replace(/\^\(n\+1\)/, '^n')), opt(d.term.replace('sum(', '-sum('))],
    solution: [{ html: `${M(`${d.f} = ${d.geo}`)}, puis 1/(1 − w) = Σ wⁿ.`, note: '' }],
  }, rng);
}

// ======================================================================
// c-laurent
// ======================================================================

const LA = 'c-laurent';
const LA_SUB = [
  { id: 'des', label: 'éléments simples', skill: 'g0-pfd-simple' },
  { id: 'inner', label: 'développement en puissances de z', skill: LA },
  { id: 'outer', label: 'développement en puissances de 1/z', skill: LA },
  { id: 'assemble', label: 'assembler la série', skill: LA },
];

const lin = (c) => (q(c).n === 0 ? 'z' : `(z${q(c).n < 0 ? '+' : '-'}${qs(q(c).n < 0 ? q(c).neg() : c)})`);
const linP = (c) => (q(c).n === 0 ? 'z' : `z${q(c).n < 0 ? '+' : '-'}${qs(q(c).n < 0 ? q(c).neg() : c)}`);
// 1/(z − c) in powers of z (inner) or of 1/z (outer): {geo, sum, wrong
// (the other expansion), sign (the (−1)ⁿ dropped)}.
function inner(c) {
  const m = Math.abs(c);
  const den = (e) => (m === 1 ? '' : `/${m}^${e}`);
  if (c > 0) {
    return {
      geo: m === 1 ? '-1/(1-z)' : `-(1/${m})·1/(1-z/${m})`,
      sum: `-sum(z^n${den('(n+1)')}, n, 0, ∞)`,
    };
  }
  return {
    geo: m === 1 ? '1/(1-(-z))' : `(1/${m})·1/(1-(-z/${m}))`,
    sum: `sum((-1)^n z^n${den('(n+1)')}, n, 0, ∞)`,
    sign: `sum(z^n${den('(n+1)')}, n, 0, ∞)`,
  };
}
function outer(c) {
  const m = Math.abs(c);
  const num = c > 0 ? (m === 1 ? '1' : `${m}^n`) : (m === 1 ? '(-1)^n' : `(-${m})^n`);
  return {
    geo: `(1/z)·1/(1-${c > 0 ? `${m}/z` : `(-${m}/z)`})`,
    sum: `sum(${num}/z^(n+1), n, 0, ∞)`,
    sign: c < 0 ? `sum(${m === 1 ? '1' : `${m}^n`}/z^(n+1), n, 0, ∞)` : null,
  };
}
function expand(c, out) {
  if (q(c).n === 0) return { geo: '1/z', sum: '1/z', mono: true };
  const e = out ? outer(c) : inner(c);
  return { ...e, wrong: (out ? inner(c) : outer(c)).sum };
}

// f = 1/((z − a)(z − b)) = A/(z − a) − A/(z − b), A = 1/(a − b); region:
// 'in' (|z| < |a|), 'mid' (|a| < |z| < |b|), 'out' (|z| > |b|).
function laFrom(a, b, reg) {
  const A = q(1, a - b);
  const ra = Math.abs(a);
  const rb = Math.abs(b);
  const dom = reg === 'in' ? [0.25 * ra, 0.6 * ra] : reg === 'mid' ? [ra + 0.25 * (rb - ra), rb - 0.25 * (rb - ra)] : [1.4 * rb, 2.5 * rb];
  const outerA = reg !== 'in';
  const outerB = reg === 'out';
  const ea = expand(a, outerA);
  const eb = expand(b, outerB);
  const f = a === 0 ? `1/(z${lin(b)})` : `1/(${lin(a)}${lin(b)})`;
  // A/(z − c) as text: 1/(z − 1), −1/(3(z − 2)), 1/(2z).
  const over = (c0, cc) => { const C0 = q(c0); const n = Math.abs(C0.n); return `${C0.n < 0 ? '-' : ''}${n}/${C0.d === 1 ? lin(cc) : `(${C0.d}${lin(cc)})`}`; };
  const des = joinT([over(A, a), over(A.neg(), b)]);
  // A·Sa − A·Sb, each S with its own sign.
  const part = (e, c) => (e.mono ? over(c, 0) : term(e.sum.startsWith('-') ? c.neg() : c, e.sum.replace(/^-/, '')));
  const total = joinT([part(ea, A), part(eb, A.neg())]);
  const regT = reg === 'in' ? `|z| < ${ra}` : reg === 'mid' ? (a === 0 ? `0 < |z| < ${rb}` : `${ra} < |z| < ${rb}`) : `|z| > ${rb}`;
  return { a, b, A, reg, regT, dom, ea, eb, outerA, outerB, f, des, total, key: `${a}:${b}:${reg}` };
}
function laData(rng, region = null) {
  for (let k = 0; k < 100; k++) {
    let [a, b] = pickK(rng, [0, 1, 2, 3, -1, -2, -3], 2);
    if (Math.abs(a) === Math.abs(b)) continue;
    if (Math.abs(a) > Math.abs(b)) [a, b] = [b, a];
    const reg = region || rng.pick(a === 0 ? ['mid', 'out'] : ['mid', 'mid', 'out', 'in']);
    if (a === 0 && (reg === 'in' || region)) continue;
    return laFrom(a, b, reg);
  }
  return laFrom(1, 2, region || 'mid');
}

// a_k of f in the region (exact).
function laCoef(d, k) {
  const one = (c, outer) => {
    const C = q(c);
    if (C.n === 0) return k === -1 ? q(1) : q(0);
    if (!outer) return k >= 0 ? q(-1).div(powQ(C, k + 1)) : q(0);
    return k <= -1 ? powQ(C, -k - 1) : q(0);
  };
  return d.A.mul(one(d.a, d.outerA)).sub(d.A.mul(one(d.b, d.outerB)));
}
function powQ(c, e) { let r = q(1); for (let j = 0; j < e; j++) r = r.mul(q(c)); return r; }

const LA_MENU = (right) => [
  { id: 'des', label: 'Décomposer en éléments simples' },
  { id: 'inner', label: '|z| < |c| : 1/(z − c) = −(1/c)·1/(1 − z/c), puissances de z' },
  { id: 'outer', label: '|z| > |c| : 1/(z − c) = (1/z)·1/(1 − c/z), puissances de 1/z' },
  { id: 'sum', label: 'Additionner les deux séries' },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || 'Ce n\'est pas l\'étape à faire maintenant.' }));

function laTermPart(d, c, outer, first, level) {
  const e = expand(c, outer);
  const C = q(c);
  const altDom = outer ? [0.2 * Math.abs(c), 0.6 * Math.abs(c)] : [1.5 * Math.abs(c), 3 * Math.abs(c)];
  const traps = { c_laurent_wrong_annulus: [{ line: e.wrong, ctx: { annulus: d.regT, a: rd(qs(C.n < 0 ? C.neg() : C)) } }] };
  if (e.sign) traps.c_laurent_sign = [e.sign];
  const decision = {
    kind: 'decision', prompt: `Dans ${d.regT}, pour 1/${rd(lin(c))} :`, levels: [2, 3, 4, 5], options: [
      { id: 'in', label: `|z| < ${Math.abs(c)} : puissances de z`, valid: !outer, ...(outer ? { rule: 'c_laurent_wrong_annulus', why: `Ici |z| > ${Math.abs(c)} : la série en z/${rd(qs(c))} diverge.` } : {}) },
      { id: 'out', label: `|z| > ${Math.abs(c)} : puissances de 1/z`, valid: outer, ...(!outer ? { rule: 'c_laurent_wrong_annulus', why: `Ici |z| < ${Math.abs(c)} : la série en ${rd(qs(c))}/z diverge.` } : {}) },
    ],
  };
  return {
    html: first ? 'Chaque élément simple, selon la couronne :' : '', ask: `1/${rd(lin(c))} =`, start: `1/${lin(c)}`,
    judge: zcfg(d.dom, { final: 'series', alt: { z: altDom }, traps }), decisions: [decision],
    lines: [eq(e.geo, outer ? '1/(z − c) = (1/z)·1/(1 − c/z)' : '1/(z − c) = −(1/c)·1/(1 − z/c)', outer ? 'outer' : 'inner'), eq(e.sum, 'série géométrique', outer ? 'outer' : 'inner', [e.sum.replace(/^-?sum\(/, '').split(', n')[0]])],
    menu: LA_MENU(outer ? 'outer' : 'inner'),
  };
}

function laParts(d, level) {
  const parts = [];
  parts.push({
    html: level === 1 ? '' : 'Éléments simples :', start: d.f, judge: zcfg(d.dom, { final: 'pfd' }),
    lines: [eq(d.des, 'éléments simples', 'des', [d.des])], menu: LA_MENU('des'),
  });
  if (level === 1) parts[0].lines[0].from = 99;
  if (d.a !== 0) parts.push(laTermPart(d, d.a, d.outerA, true, level));
  parts.push(laTermPart(d, d.b, d.outerB, d.a === 0, level));
  parts.push({
    html: 'On assemble :', ask: 'f(z) =', start: d.des, judge: zcfg(d.dom, { final: 'series' }),
    lines: [eq(d.total, 'somme des deux développements', 'assemble', [d.total])], menu: LA_MENU('sum'),
  });
  return level === 1 ? parts.slice(1).map((p, i) => (i === 0 ? { ...p, html: `${M(`f(z) = ${d.des}`)}. ${p.html}` } : p)) : parts;
}

// Around z₀ = 1: f = 1/(z(z − 1)) = 1/(z − 1) − 1/z, 0 < |z − 1| < 1.
function laShifted(level, rng, opts) {
  const s = rng.pick([1, -1]);
  const f = s > 0 ? '1/(z(z-1))' : '1/(z(1-z))';
  const des = s > 0 ? '1/(z-1)-1/z' : '1/z-1/(z-1)';
  const zsum = 'sum((-1)^n (z-1)^n, n, 0, ∞)';
  const total = s > 0 ? `1/(z-1)-${zsum}` : `${zsum}-1/(z-1)`;
  const cfg = (extra) => CV({ vars: ZV, real: ['z'], domain: { z: [1.2, 1.7] }, at: 1, ...extra });
  return linesOf({
    level, skill: LA, key: `${LA}:${level}:shift:${s}`, keys: KEYS, subgoals: LA_SUB, exam: examTag(opts, 3),
    prompt: `Développe ${M(`f(z) = ${f}`)} en série de Laurent autour de z₀ = 1, dans 0 < |z − 1| < 1.`,
    parts: [
      { html: 'Éléments simples :', start: f, judge: cfg({ final: 'pfd' }), lines: [eq(des, 'éléments simples', 'des')] },
      { html: '1/z en puissances de z − 1 (|z − 1| < 1) :', ask: '1/z =', start: '1/z', judge: cfg({ final: 'series', traps: { c_laurent_sign: ['sum((z-1)^n, n, 0, ∞)'] } }), lines: [eq('1/(1-(-(z-1)))', 'z = 1 + (z − 1)', 'inner'), eq(zsum, 'série géométrique', 'inner')] },
      { html: 'On assemble :', ask: 'f(z) =', start: des, judge: cfg({ final: 'series' }), lines: [eq(total, '1/(z − 1) est déjà une puissance de z − 1', 'assemble')] },
    ],
    hints: H('Décompose, puis écris 1/z = 1/(1 + (z − 1)) en puissances de z − 1.', M('1/z = sum((-1)^n (z-1)^n, n, 0, ∞)'), M(total)),
  });
}

function laLines(level, rng, opts) {
  if (level >= 4 && rng.chance(0.25)) return laShifted(level, rng, opts);
  const d = laData(rng);
  return linesOf({
    level, skill: LA, key: `${LA}:${level}:${d.key}`, keys: KEYS, subgoals: LA_SUB, exam: examTag(opts, 3),
    prompt: `Développe ${M(`f(z) = ${d.f}`)} en série de Laurent dans la couronne ${d.regT}.`,
    parts: laParts(d, level),
    hints: H('Décompose, puis regarde si |z| est plus petit ou plus grand que chaque pôle.', `${M(`f(z) = ${d.des}`)}`, M(d.total)),
  });
}

// Level 5: the three regions of one f, then a₋₂ or a₋₃ in the last.
function laProblem(level, rng, opts) {
  const base = laData(rng, 'mid');
  const regs = ['in', 'mid', 'out'].map((reg) => laFrom(base.a, base.b, reg));
  const items = regs.map((d) => linesOf({
    level: 4, skill: LA, key: `${LA}:5:${d.key}`, keys: KEYS, subgoals: LA_SUB, prompt: `Dans ${d.regT} :`,
    parts: [{ start: d.f, judge: zcfg(d.dom, { final: 'series' }), lines: [eq(d.total, '', 'assemble')] }], hints: H('', '', ''),
  }));
  const last = regs[2];
  const k = rng.pick([-3, -4]);
  const c = laCoef(last, k);
  const coef = answerItem({ skill: LA, level, key: `5:${last.key}:${k}`, prompt: `Dans ${last.regT}, le coefficient a${kSub(k)} de ${M(`z^(${k})`)} vaut :`, expected: qs(c) });
  return problemItem({
    skill: LA, level, key: `5:${base.key}`, exam: examTag(opts, 4),
    prompt: `${M(`f(z) = ${base.f}`)} : séries de Laurent dans les trois régions, puis un coefficient.`,
    parts: [...items.map((it, i) => ({ item: it, points: 1, title: regs[i].regT })), { item: coef, points: 1, title: 'Coefficient' }],
  });
}

const ESS_COEF = [
  { f: 'e^(1/z)', k: -3, c: '1/6' }, { f: 'e^(1/z)', k: -2, c: '1/2' }, { f: 'z^2·sin(1/z)', k: -1, c: '-1/6' }, { f: 'z^2·sin(1/z)', k: 1, c: '1' },
  { f: 'z·e^(1/z)', k: -1, c: '1/2' }, { f: 'cos(1/z)', k: -2, c: '-1/2' }, { f: 'z^3·cos(1/z)', k: 1, c: '-1/2' },
];
const kSub = (k) => String(k).replace('-', '₋').replace(/\d/g, (x) => '₀₁₂₃₄₅₆₇₈₉'[x]);

function laCoefItem(level, rng, opts) {
  if (rng.chance(0.35)) {
    const e = rng.pick(ESS_COEF);
    return answerItem({ skill: LA, level, key: `ess:${e.f}:${e.k}`, exam: examTag(opts, 2), prompt: `Série de Laurent de ${M(`f(z) = ${e.f}`)} dans |z| > 0 : a${kSub(e.k)} = ?`, expected: e.c });
  }
  const d = laData(rng);
  const ks = d.reg === 'in' ? [1, 2] : d.reg === 'mid' ? [-2, -3, 1, 2].filter((k) => d.a !== 0 || k > 0) : [-3, -4];
  const k = rng.pick(ks);
  return answerItem({
    skill: LA, level, key: `${d.key}:${k}`, exam: examTag(opts, 2),
    prompt: `Série de Laurent de ${M(`f(z) = ${d.f}`)} dans ${d.regT} : a${kSub(k)} (coefficient de ${M(`z^(${k})`)}) = ?`,
    expected: qs(laCoef(d, k)), solution: [{ html: M(`f(z) = ${d.total}`), note: '' }],
  });
}

function laMcq(level, rng, opts) {
  const d = laData(rng, 'mid');
  const regs = ['in', 'mid', 'out'].map((reg) => laFrom(d.a, d.b, reg));
  if (opts.multi) {
    const pool = [
      { html: `dans ${regs[1].regT} : ${M(`f(z) = ${regs[1].total}`)}`, correct: true },
      { html: `dans ${regs[1].regT} : ${M(`f(z) = ${regs[0].total}`)}`, correct: false, rule: 'c_laurent_wrong_annulus' },
      { html: `dans ${regs[0].regT} : ${M(`f(z) = ${regs[0].total}`)}`, correct: true },
      { html: `dans ${regs[2].regT} : ${M(`f(z) = ${regs[2].total}`)}`, correct: true },
      { html: `dans ${regs[2].regT} : ${M(`f(z) = ${regs[1].total}`)}`, correct: false, rule: 'c_laurent_wrong_annulus' },
    ];
    return choice({ skill: LA, level, multi: true, key: `multi:${d.key}`, exam: examTag(opts, 2), prompt: `${M(`f(z) = ${d.f}`)}. Cochez les développements justes.`, options: pickK(rng, pool, 5) }, rng);
  }
  const neg = regs[1].total.startsWith('-') ? regs[1].total.slice(1) : `-(${regs[1].total})`;
  return choice({
    skill: LA, level, key: `mcq:${d.key}`, exam: examTag(opts, 2),
    prompt: `La série de Laurent de ${M(`f(z) = ${d.f}`)} dans ${d.regT} est :`,
    right: M(regs[1].total),
    wrongs: [opt(regs[0].total, 'c_laurent_wrong_annulus'), opt(regs[2].total, 'c_laurent_wrong_annulus'), opt(neg)],
    solution: [{ html: `${M(`f(z) = ${d.des}`)} ; |z| > ${Math.abs(d.a)} : puissances de 1/z ; |z| < ${Math.abs(d.b)} : puissances de z.`, note: '' }],
    expectedSec: 150,
  }, rng);
}

// ======================================================================
// c-singularities
// ======================================================================

const SI = 'c-singularities';
const SI_SUB = [
  { id: 'zero-num', label: 'ordre du zéro du numérateur', skill: 'a1-dl-usual' },
  { id: 'zero-den', label: 'ordre du zéro du dénominateur', skill: 'a1-dl-usual' },
  { id: 'classify', label: 'classer la singularité', skill: SI },
];

// Pieces in the variable v (z, or h = z − a): {t, ord, dl (leading term + o), trivial}.
const NUMS = [
  { t: 'sin(V)', ord: 1, dl: 'V+o(V)' }, { t: '1-cos(V)', ord: 2, dl: 'V^2/2+o(V^2)' }, { t: 'e^V-1', ord: 1, dl: 'V+o(V)' },
  { t: 'V^2', ord: 2, trivial: true }, { t: 'V', ord: 1, trivial: true }, { t: 'sin(V)^2', ord: 2, dl: 'V^2+o(V^2)' }, { t: '1', ord: 0, trivial: true },
  { t: 'V-sin(V)', ord: 3, dl: 'V^3/6+o(V^3)' }, { t: 'e^V', ord: 0, trivial: true },
];
const DENS = [
  { t: 'V^2', ord: 2, trivial: true }, { t: 'V^3', ord: 3, trivial: true }, { t: 'V', ord: 1, trivial: true }, { t: 'sin(V)^2', ord: 2, dl: 'V^2+o(V^2)' },
  { t: 'sin(V)', ord: 1, dl: 'V+o(V)' }, { t: '1-cos(V)', ord: 2, dl: 'V^2/2+o(V^2)' }, { t: 'V·sin(V)', ord: 2, dl: 'V^2+o(V^2)' },
];
// The piece written in v: sin(V) → sin(z − 1), V^2 → (z − 1)^2.
const sub = (t, v) => { const inner = v.replace(/^\((.*)\)$/, '$1'); return t.replace(/\(V\)/g, `(${inner})`).replace(/V/g, v); };
// A denominator in brackets when it is a sum or a product.
const denT = (t) => (/[+\-·]/.test(t.replace(/\([^()]*\)/g, '')) ? `(${t})` : t);

function siData(rng) {
  for (let k = 0; k < 200; k++) {
    const p = rng.pick(NUMS);
    const qd = rng.pick(DENS);
    if (p.trivial && qd.trivial) continue;
    const a = rng.pick([0, 0, 0, 1, 2, -1]);
    const v = a === 0 ? 'z' : 'h';
    const zv = a === 0 ? 'z' : `(z${a > 0 ? '-' : '+'}${Math.abs(a)})`;
    const fz = `${denT(sub(p.t, zv))}/${denT(sub(qd.t, zv))}`;
    const m = qd.ord - p.ord;
    // Balance: removable, simple pole, higher pole.
    const want = rng.pick(['rem', 'simple', 'high']);
    const kind = m <= 0 ? 'rem' : m === 1 ? 'simple' : 'high';
    if (kind !== want && k < 150) continue;
    const st = singularityType(parse(fz, { vars: ['z'], complex: true }), 'z', a);
    const ok = m <= 0 ? st.kind === 'removable' : st.kind === 'pole' && st.order === m;
    if (!ok) continue;
    return { p, qd, a, v, zv, f: fz, fv: `${denT(sub(p.t, v))}/${denT(sub(qd.t, v))}`, m: Math.max(0, m), kind: m <= 0 ? 'removable' : 'pole', key: `${p.t}:${qd.t}:${a}` };
  }
  return null;
}

const natureDecision = (d) => ({
  kind: 'decision', prompt: `ord(dénominateur) = ${d.qd.ord}, ord(numérateur) = ${d.p.ord} : la singularité est`, options: [
    { id: 'rem', label: 'apparente (pas de puissance négative)', valid: d.kind === 'removable', ...(d.kind === 'removable' ? {} : { why: 'Le dénominateur s\'annule plus vite : il reste une puissance négative.' }) },
    { id: 'pole', label: 'un pôle', valid: d.kind === 'pole', ...(d.kind === 'pole' ? {} : { rule: 'c_removable_as_pole', why: 'Le numérateur s\'annule au moins aussi vite : la limite est finie, la singularité est apparente.' }) },
    { id: 'ess', label: 'essentielle', valid: false, why: 'Un quotient de fonctions holomorphes n\'a pas de singularité essentielle là : seulement un nombre fini de puissances négatives.' },
  ],
});

function siParts(d, level) {
  const parts = [];
  const v = d.v;
  const shiftNote = d.a === 0 ? '' : `On pose h = z ${d.a < 0 ? '+' : '−'} ${Math.abs(d.a)} : f = ${M(d.fv)}. `;
  const series = (pc, subgoal, label) => ({
    html: `${label} :`, ask: '', start: sub(pc.t, v), judge: { kind: 'series', v, at: 0, order: pc.ord },
    lines: [eq(sub(pc.dl, v), 'DL usuel', subgoal, [sub(pc.dl, v).split('+o(')[0]])],
    menu: [{ id: 'dl', label: 'Écrire le premier terme non nul du DL', valid: true }, { id: 'lim', label: 'Calculer la limite', valid: false, why: 'On veut l\'ordre du zéro : le premier terme non nul du DL.' }],
  });
  if (level >= 2) {
    if (!d.p.trivial) parts.push(series(d.p, 'zero-num', `${shiftNote}Le numérateur`));
    if (!d.qd.trivial) parts.push(series(d.qd, 'zero-den', parts.length ? 'Le dénominateur' : `${shiftNote}Le dénominateur`));
  }
  const ask = d.kind === 'pole' ? 'ordre du pôle m =' : 'ordre (0 : apparente) m =';
  const traps = d.p.ord > 0 && d.qd.ord !== d.m ? { c_order_pole_numerator: [String(d.qd.ord)] } : {};
  parts.push({
    html: level === 1 ? `${shiftNote}${d.p.ord ? `Le numérateur a un zéro d'ordre ${d.p.ord}` : "Le numérateur ne s'annule pas"}, le dénominateur a un zéro d'ordre ${d.qd.ord}.` : (parts.length ? 'On conclut :' : `${shiftNote}On conclut :`), ask,
    start: 'm', judge: CV({ raw: { text: 'm', html: M('m') }, expect: String(d.m), final: 'number', traps }),
    decisions: [
      ...(level === 3 ? [{
        kind: 'decision', prompt: 'Quelle méthode ?', options: [
          { id: 'zeros', label: 'Ordres des zéros en haut et en bas', valid: true, ref: true },
          { id: 'laurent', label: 'Série de Laurent complète', valid: true, quality: 'poor', why: 'Juste, mais les ordres des zéros suffisent.' },
          { id: 'lim', label: 'Limite de f en z₀', valid: true, quality: 'poor', why: 'Juste pour reconnaître une singularité apparente, mais elle ne donne pas l\'ordre du pôle.' },
        ],
      }] : []),
      natureDecision(d),
    ],
    lines: [eq(String(d.m), d.kind === 'pole' ? 'ord(bas) − ord(haut)' : 'le numérateur compense', 'classify', [String(d.m)])],
    menu: [{ id: 'diff', label: 'm = ord(dénominateur) − ord(numérateur)', valid: true }, { id: 'den', label: 'm = ord(dénominateur)', valid: false, rule: 'c_order_pole_numerator', why: 'Le numérateur s\'annule aussi : retranche son ordre.' }],
  });
  return parts;
}

function siLines(level, rng, opts) {
  const d = siData(rng);
  return linesOf({
    level, skill: SI, key: `${SI}:${level}:${d.key}`, keys: KEYS, subgoals: SI_SUB, exam: examTag(opts, 1.5),
    prompt: `Nature de la singularité de ${M(`f(z) = ${d.f}`)} en z₀ = ${rd(String(d.a))} ; si c'est un pôle, son ordre.`,
    parts: siParts(d, level),
    hints: H('Compte l\'ordre du zéro en haut et en bas.', `${d.p.dl ? M(sub(d.p.dl, d.v)) : `ordre ${d.p.ord}`} en haut, ${d.qd.dl ? M(sub(d.qd.dl, d.v)) : `ordre ${d.qd.ord}`} en bas`, d.kind === 'pole' ? `pôle d'ordre ${d.m}` : 'singularité apparente (m = 0)'),
  });
}

const ESS = [{ f: 'e^(1/z)', z0: '0' }, { f: 'z^2·sin(1/z)', z0: '0' }, { f: 'sin(1/(1-2z))', z0: '1/2' }, { f: 'cos(1/z)', z0: '0' }, { f: 'z·e^(1/z)', z0: '0' }];

function siMcqOf(level, rng, opts, f, z0, truth) {
  const labels = ['une singularité apparente', 'un pôle simple', 'un pôle double', 'une singularité essentielle'];
  const right = truth.kind === 'removable' ? 0 : truth.kind === 'essential' ? 3 : truth.order === 1 ? 1 : truth.order === 2 ? 2 : -1;
  const options = labels.map((l, i) => ({
    html: l, correct: i === right,
    rule: i === right ? null : truth.kind === 'removable' && (i === 1 || i === 2) ? 'c_removable_as_pole' : truth.kind === 'pole' && (i === 1 || i === 2) ? 'c_order_pole_numerator' : null,
  }));
  if (right < 0) options.push({ html: `un pôle d'ordre ${truth.order}`, correct: true });
  return choice({ skill: SI, level, key: `mcq:${f}:${z0}`, exam: examTag(opts, 2), keepOrder: true, prompt: `En z₀ = ${rd(z0)}, ${M(`f(z) = ${f}`)} a :`, options }, rng);
}

function siMcq(level, rng, opts) {
  if (rng.chance(0.3)) {
    const e = rng.pick(ESS);
    return siMcqOf(level, rng, opts, e.f, e.z0, { kind: 'essential' });
  }
  const d = siData(rng);
  return siMcqOf(level, rng, opts, d.f, String(d.a), d.kind === 'removable' ? { kind: 'removable' } : { kind: 'pole', order: d.m });
}

// Level 5: every singularity of f = p(z)/(zᵐ (z − a)ᵏ), each as a multiple choice.
function siProblem(level, rng, opts) {
  const p = rng.pick(['sin(z)', '1-cos(z)', 'e^z-1', 'z']);
  const m = rng.pick([1, 2, 3]);
  const a = rng.pick([1, 2, -1, -2]);
  const k = rng.pick([1, 2]);
  const f = `${p}/(z${m > 1 ? `^${m}` : ''}(z${a > 0 ? '-' : '+'}${Math.abs(a)})${k > 1 ? `^${k}` : ''})`;
  const node = parse(f, { vars: ['z'], complex: true });
  const parts = [0, a].map((z0) => {
    const t = singularityType(node, 'z', z0);
    return { item: siMcqOf(level, rng, {}, f, String(z0), t), points: 1, title: `z₀ = ${rd(String(z0))}` };
  });
  return problemItem({ skill: SI, level, key: `5:${f}`, exam: examTag(opts, 2), prompt: `Les singularités de ${M(`f(z) = ${f}`)} sont 0 et ${rd(String(a))}. Classe-les.`, parts });
}

function siOpen(level, rng, opts) {
  const a = siLines(4, rng, {});
  const b = siLines(4, rng, {});
  return problemItem({
    skill: SI, level, key: `open:${a.key}:${b.key}`, exam: examTag(opts, 3), prompt: 'Classe les singularités de ces deux fonctions.',
    parts: [{ item: a, points: 1.5, title: 'Première fonction' }, { item: b, points: 1.5, title: 'Seconde fonction' }],
  });
}

export const GEN = {
  [TA]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return taMcq(4, rng, opts);
    if (opts.exam === 'coef') return taCoef(4, rng, opts);
    if (level === 4 && rng.chance(0.3)) return taQuotient(level, rng, opts);
    return taLines(level, rng, opts);
  },
  [LA]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return laMcq(4, rng, opts);
    if (opts.exam === 'coef') return laCoefItem(4, rng, opts);
    if (level === 5) return laProblem(5, rng, opts);
    return laLines(level, rng, opts);
  },
  [SI]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return siMcq(4, rng, opts);
    if (opts.exam === 'open') return siOpen(4, rng, opts);
    if (level === 5) return siProblem(5, rng, opts);
    return siLines(level, rng, opts);
  },
};

void Q;
