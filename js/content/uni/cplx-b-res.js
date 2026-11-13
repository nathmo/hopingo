// c-res-simple and c-res-multiple (module C, part b, step U10): residues at
// a simple pole (p(z₀)/q′(z₀)) and at a pole of order m (derivative of
// (z − z₀)^m f). Each value is a `cval` part (js/judges/cplx-cb.js) whose
// start is a label (« Res(f ; i) ») and whose lines must have the
// reference value; derivatives are `cval` parts with vars ['z'] (and t for
// the Laplace inverse of L5). Every reference residue is checked against
// the numeric a₋₁ of js/cas/series.js when VERIFY.on (tests).

import { CQ } from '../../cas/complex.js';
import {
  q, cq, cT, cP, zMinus, rd, CM, inner, resLabel, mathLabel, CV, P, pT, checkRes, SG, L, chain, choice, opt, niceC, scaledOpt,
  partsItem, H, examTag, KEYS, pick,
} from './cplx-b-kit.js';
import { t } from '../../i18n.js';

const RS = 'c-res-simple';
const RM = 'c-res-multiple';
// (z − a) as a factor: 'z' alone for a = 0.
const zf = (a) => (a === 0 || (a instanceof CQ && a.isZero()) ? 'z' : `(${zMinus(a)})`);
const sub = (a, b) => (a instanceof CQ ? a : cq(a)).sub(b instanceof CQ ? b : cq(b));

const qpML = (arg) => `<msup><mi>q</mi><mo>′</mo></msup><mo>(</mo>${arg}<mo>)</mo>`;

// ======================================================================
// c-res-simple
// ======================================================================

// A simple pole of f = p/q: texts and values.
function simpleData(rng, { trig = true } = {}) {
  const kind = pick(rng, trig ? ['sq', 'sq', 'q4', 'q4', 'ab', 'ab', 'cube', 'sin', 'cos'] : ['sq', 'sq', 'q4', 'q4', 'ab', 'ab', 'cube']);
  if (kind === 'sq') {
    const a = pick(rng, [1, 2, 3]);
    const s = rng.chance(0.75) ? 1 : -1;
    const z0 = cq(0, s * a);
    const pk = pick(rng, ['1', 'z', 'z2', 'exp', 'exp']);
    const al = pick(rng, [1, 2, 3]);
    const qT = `z^2+${a * a}`;
    const dq0 = z0.mul(2);
    let p; let pv; let res; let sb;
    if (pk === 'exp') {
      p = al === 1 ? 'e^(iz)' : `e^(${al}iz)`;
      const k = -s * al * a;
      pv = `e^(${k})`;
      sb = `${pv}/(${cT(dq0)})`;
      res = `${s > 0 ? '-' : ''}ie^(${k})/${2 * a}`;
    } else {
      const P0 = { 1: cq(1), z: z0, z2: z0.mul(z0) }[pk];
      p = { 1: '1', z: 'z', z2: 'z^2' }[pk];
      pv = cT(P0);
      sb = `${cP(P0)}/(${cT(dq0)})`;
      res = cT(P0.div(dq0));
    }
    return { id: `sq:${a}:${s}:${pk}:${al}`, p, q: qT, dq: '2z', z0T: cT(z0), dq0Sub: `2(${cT(z0)})`, dq0: cT(dq0), pv, sub: sb, res, deg: 2, noExp: pk === 'exp' ? `1/(${cT(dq0)})` : null };
  }
  if (kind === 'q4') {
    const z0 = cq(pick(rng, [1, -1]), pick(rng, [1, -1]));
    const k = pick(rng, [0, 1, 2]);
    const P0 = z0.pow(k);
    const dq0 = z0.pow(3).mul(4);
    return { id: `q4:${cT(z0)}:${k}`, p: ['1', 'z', 'z^2'][k], q: 'z^4+4', dq: '4z^3', z0T: cT(z0), dq0Sub: `4(${cT(z0)})^3`, dq0: cT(dq0), pv: cT(P0), sub: `${cP(P0)}/(${cT(dq0)})`, res: cT(P0.div(dq0)), deg: 4 };
  }
  if (kind === 'ab') {
    const pool = [cq(1), cq(2), cq(-1), cq(-2), cq(3), cq(-3), cq(0, 1), cq(0, -1), cq(0, 2), cq(0, -2)];
    const a = pick(rng, pool);
    let b = pick(rng, pool);
    if (b.eq(a)) b = a.neg();
    const k = pick(rng, [0, 1, 1, 2]);
    const P0 = a.pow(k);
    const dq0 = a.sub(b);
    const dq = pT([a.add(b).neg(), cq(2)]);
    return { id: `ab:${cT(a)}:${cT(b)}:${k}`, p: ['1', 'z', 'z^2'][k], q: `(${zMinus(a)})(${zMinus(b)})`, dq, z0T: cT(a), dq0Sub: `2(${cT(a)})-(${cT(a.add(b))})`, dq0: cT(dq0), pv: cT(P0), sub: `${cP(P0)}/(${cT(dq0)})`, res: cT(P0.div(dq0)), deg: 2, factored: true };
  }
  if (kind === 'cube') {
    const k = pick(rng, [0, 1, 2]);
    return { id: `cube:${k}`, p: ['1', 'z+1', 'z^2+2'][k], q: 'z^3-1', dq: '3z^2', z0T: '1', dq0Sub: '3(1)^2', dq0: '3', pv: ['1', '2', '3'][k], sub: `${['1', '2', '3'][k]}/3`, res: ['1/3', '2/3', '1'][k], deg: 3 };
  }
  if (kind === 'sin') {
    const k = pick(rng, [1, -1, 2]);
    const z0T = { 1: 'π', [-1]: '-π', 2: '2π' }[k];
    const sg = k % 2 === 0 ? 1 : -1;
    const withZ = rng.chance(0.5);
    const pv = withZ ? z0T : '1';
    const res = withZ ? (sg > 0 ? z0T : rd(z0T).startsWith('−') ? z0T.slice(1) : `-${z0T}`) : String(sg);
    return { id: `sin:${k}:${withZ}`, p: withZ ? 'z' : '1', q: 'sin(z)', dq: 'cos(z)', z0T, dq0Sub: `cos(${z0T})`, dq0: String(sg), pv, sub: `${withZ ? `(${z0T})` : '1'}/(${sg})`, res, deg: 0, trig: true };
  }
  const s = pick(rng, [1, -1]);
  const z0T = s > 0 ? 'π/2' : '-π/2';
  const withZ = rng.chance(0.5);
  const dq0 = String(-s);
  const res = withZ ? '-π/2' : String(-s);
  return { id: `cos:${s}:${withZ}`, p: withZ ? 'z' : '1', q: 'cos(z)', dq: '-sin(z)', z0T, dq0Sub: `-sin(${z0T})`, dq0, pv: withZ ? z0T : '1', sub: `${withZ ? `(${z0T})` : '1'}/(${dq0})`, res, deg: 0, trig: true };
}

const fOf = (d) => (d.p === '1' ? `1/(${d.q})` : `(${d.p})/(${d.q})`);
const fML = (d) => CM(d.p === '1' ? `1/(${d.q})` : `${d.p}/(${d.q})`);

const SUB_S = [SG('derivative', t('q′ et q′(z₀)'), RS), SG('value', 'Res = p(z₀)/q′(z₀)', RS)];

function simpleParts(d, level, { only = false } = {}) {
  const dqJ = CV(mathLabel('q′(z)', qpML('<mi>z</mi>')), d.dq, { vars: ['z'], form: 'any' });
  const dq0J = CV(mathLabel(`q′(${rd(d.z0T)})`, qpML(inner(d.z0T))), d.dq0);
  const resJ = CV(resLabel(d.z0T), d.res, d.noExp ? { traps: { c_essential_factor: [{ line: d.noExp, ctx: {} }] } } : {});
  const MENU_D = [
    { id: 'der', label: t('Dériver le dénominateur q'), valid: true },
    { id: 'q0', label: t('Calculer q(z₀)'), valid: false, why: t('q(z₀) = 0 : c\'est justement le pôle. On dérive q.') },
  ];
  const MENU_E = [
    { id: 'subst', label: t('Remplacer z par z₀ dans q′'), valid: true },
    { id: 'calc', label: t('Calculer (i² = −1)'), valid: true },
  ];
  const MENU_R = [
    { id: 'div', label: t('Diviser p(z₀) par q′(z₀)'), valid: true },
    { id: 'alg', label: t('Écrire sous la forme a + bi (multiplier par le conjugué)'), valid: true },
    { id: 'mul', label: t('Multiplier p(z₀) par q′(z₀)'), valid: false, why: t('Le résidu est un quotient : p(z₀)/q′(z₀).') },
  ];
  const resLines = chain(resJ, [d.sub, d.res]).map((tt, i, a) => L(tt, i === a.length - 1 ? t('Simplifier') : `p(z₀) = ${rd(d.pv)}, q′(z₀) = ${rd(d.dq0)}`, 'value', { blank: i === 0 ? [d.dq0] : [tt], blank2: [tt] }));
  const partRes = {
    html: only ? '' : t('Le résidu :'), ask: 'Res =', start: resJ.label, judge: resJ, menu: MENU_R, lines: resLines,
  };
  if (only) return [partRes];
  const decision = {
    kind: 'decision', prompt: t('Quelle formule pour ce pôle simple ?'), levels: [2, 3],
    options: [
      { id: 'pq', label: 'Res = p(z₀)/q′(z₀)', valid: true, ref: true },
      d.factored
        ? { id: 'lim', label: 'Res = lim (z − z₀)·f(z)', valid: true, why: t('Juste aussi : q est déjà factorisé, on simplifie par z − z₀.') }
        : { id: 'lim', label: 'Res = lim (z − z₀)·f(z)', valid: true, quality: 'poor', why: t('Juste, mais il faudrait factoriser {q} : p/q′ évite ce calcul.', { q: rd(d.q) }) },
      { id: 'laurent', label: t('Développer f en série de Laurent'), valid: true, quality: 'poor', why: t('Juste, mais bien plus long : en un pôle simple, la formule p/q′ suffit.') },
      { id: 'pq0', label: 'Res = p(z₀)/q(z₀)', valid: false, why: t('q(z₀) = 0 : on ne divise pas par q(z₀). C\'est q′(z₀) qui compte.') },
    ],
  };
  return [
    { start: dqJ.label, judge: dqJ, decisions: [decision], menu: MENU_D, lines: [L(d.dq, t('Dériver q'), 'derivative', { blank: [d.dq] })] },
    { html: t('q′(z) = {a}. En z₀ :', { a: CM(d.dq) }), ask: `q′(${rd(d.z0T)}) =`, start: dq0J.label, judge: dq0J, menu: MENU_E, lines: chain(dq0J, [d.dq0Sub, d.dq0]).map((tt, i, a) => L(tt, i === a.length - 1 ? t('Calculer') : t('Remplacer z par z₀'), 'derivative', { blank: [tt] })) },
    partRes,
  ];
}

function simpleLines(level, rng, opts = {}) {
  const coef = opts.exam === 'coef';
  const d = simpleData(rng);
  checkRes(fOf(d), d.z0T, d.res);
  const parts = simpleParts(d, level, { only: level === 1 || coef });
  if (level === 1) parts[0].notes = [t('Le dénominateur est q(z) = {a}, q′(z) = {b} et q′({c}) = {d}. Le numérateur vaut p({c}) = {e}.', { a: CM(d.q), b: CM(d.dq), c: CM(d.z0T), d: CM(d.dq0), e: CM(d.pv) })];
  return partsItem({
    skill: RS, level, prompt: t('z₀ = {a} est un pôle simple de f(z) = {b}. Calcule Res(f ; {a}).', { a: CM(d.z0T), b: fML(d) }),
    parts, keys: KEYS, subgoals: SUB_S,
    hints: H(t('Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀).'), t('q′(z) = {a}, donc q′({b}) = {c}.', { a: CM(d.dq), b: CM(d.z0T), c: CM(d.dq0) }), `Res = ${CM(d.sub)} = ${CM(d.res)}`),
    key: `${RS}:${level}:${d.id}`, exam: examTag(opts, coef ? 2 : 1),
    baits: d.noExp ? ['c_essential_factor'] : [],
  });
}

// L5: the residues at every pole of a half-plane.
function simpleAll(level, rng) {
  const kind = pick(rng, ['q4', 'two']);
  const up = rng.chance(0.7);
  let f; let fm; let poles; let dq;
  if (kind === 'q4') {
    const k = pick(rng, [0, 1, 2]);
    const p = ['1', 'z', 'z^2'][k];
    poles = [cq(1, up ? 1 : -1), cq(-1, up ? 1 : -1)].map((z) => ({ z, res: z.pow(k).div(z.pow(3).mul(4)), sub: `${cP(z.pow(k))}/(4(${cT(z)})^3)` }));
    f = k ? `${p}/(z^4+4)` : '1/(z^4+4)'; fm = CM(f); dq = '4z^3';
  } else {
    const a = pick(rng, [1, 2]);
    const b = a === 1 ? pick(rng, [2, 3]) : 3;
    const s = up ? 1 : -1;
    // 1/((z² + a²)(z² + b²)): Res at sai = 1/(2sai(b² − a²)).
    poles = [a, b].map((c) => {
      const z = cq(0, s * c);
      const other = c === a ? b : a;
      const res = cq(1).div(z.mul(2).mul(other * other - c * c));
      return { z, res, sub: `1/(2(${cT(z)})((${cT(z)})^2+${other * other}))` };
    });
    f = `1/((z^2+${a * a})(z^2+${b * b}))`; fm = CM(f); dq = null;
  }
  const parts = [];
  poles.forEach((pl, i) => {
    const J = CV(resLabel(cT(pl.z)), cT(pl.res));
    checkRes(f, cT(pl.z), cT(pl.res));
    parts.push({ html: i ? t('Pôle suivant, z = {a} :', { a: CM(cT(pl.z)) }) : '', ask: 'Res =', start: J.label, judge: J, lines: chain(J, [pl.sub, cT(pl.res)]).map((tt) => L(tt, 'p(z₀)/q′(z₀)', 'value')) });
  });
  return partsItem({
    skill: RS, level, prompt: dq ? t('Calcule les résidus de f(z) = {fm} en tous ses pôles du demi-plan {a}. Commence par le pôle de plus petit module.', { fm, a: up ? 'Im z > 0' : 'Im z < 0' }) : t('Calcule les résidus de f(z) = {fm} en tous ses pôles du demi-plan {a} (ce sont des pôles simples). Commence par le pôle de plus petit module.', { fm, a: up ? 'Im z > 0' : 'Im z < 0' }),
    parts, keys: KEYS, subgoals: SUB_S, hints: [], key: `${RS}:5:${kind}:${up}:${f}`,
  });
}

function simpleMcq(rng, opts) {
  const d = simpleData(rng, { trig: true });
  checkRes(fOf(d), d.z0T, d.res);
  const multi = !!opts.multi;
  const inv = d.pv === '0' || d.noExp ? null : niceC(`(${d.dq0})/(${d.pv})`);
  return choice({
    skill: RS, level: 4, key: `${RS}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: multi ? t('Soit f(z) = {a}. Res(f ; {b}) = (plusieurs réponses possibles)', { a: fML(d), b: CM(d.z0T) }) : t('Soit f(z) = {a}. Res(f ; {b}) =', { a: fML(d), b: CM(d.z0T) }),
    right: CM(niceC(d.res) || d.res), rightText: d.res, rights: multi ? [CM(d.sub)] : [],
    wrongs: [d.noExp && opt(niceC(d.noExp) || d.noExp, 'c_essential_factor'), scaledOpt('-1', d.res), inv && opt(inv), scaledOpt('2', d.res)],
    fillers: [scaledOpt('i', d.res), scaledOpt('1/2', d.res), scaledOpt('-i', d.res)],
    solution: [{ html: t('Pôle simple : Res = p(z₀)/q′(z₀) = {a} = {b}.', { a: CM(d.sub), b: CM(d.res) }), note: '' }],
    expectedSec: 120,
  }, rng);
}

// ======================================================================
// c-res-multiple
// ======================================================================

const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const binom = (n, k) => fact(n) / (fact(k) * fact(n - k));
const powT = (base, k) => (k === 1 ? base : `${base}^${k}`);
// e^a and e^(at) as texts.
const ea = (a) => (a === 0 ? '1' : a === 1 ? 'e' : `e^(${a})`);
const eat = (a) => (a === 0 ? '' : `e^(${a === 1 ? '' : a === -1 ? '-' : a}t)`);

// φ = g/h with g = 1, z, e^z or e^(zt), h = 1 or z − b: φ^(k) as text (in z).
function phiDeriv(g, b, k) {
  if (b === null) {
    if (g === 'z') return k === 0 ? 'z' : k === 1 ? '1' : '0';
    if (g === 'e^z') return 'e^z';
    if (g === 'e^(zt)') return k === 0 ? 'e^(zt)' : `${powT('t', k)}e^(zt)`;
  }
  const w = zMinus(b);
  const W = zf(b);
  if (g === '1') return k === 0 ? `1/${W}` : `${k % 2 ? '-' : ''}${fact(k)}/${W}^${k + 1}`;
  if (g === 'z') {
    // z/(z − b) = 1 + b/(z − b)
    if (k === 0) return `z/${W}`;
    const c = (k % 2 ? -1 : 1) * fact(k) * b;
    return `${c}/${W}^${k + 1}`;
  }
  // e^(cz)/(z − b): e^(cz) Σ_j C(k,j) c^(k−j) (−1)^j j!/(z − b)^(j+1), c = 1 or t.
  const c = g === 'e^z' ? '' : 't';
  const E = g;
  if (k === 0) return `${E}/${W}`;
  const terms = [];
  for (let j = 0; j <= k; j++) {
    const coef = binom(k, j) * fact(j) * (j % 2 ? -1 : 1);
    const cp = k - j === 0 ? '' : c ? powT('t', k - j) : '';
    const wp = k - j === 0 ? '' : powT(W, k - j);
    let tt = `${cp}${wp}`;
    const abs = Math.abs(coef);
    tt = abs === 1 ? (tt || '1') : `${abs}${tt}`;
    terms.push({ s: coef < 0 ? '-' : '+', t: tt });
  }
  const num = terms.map((x, i) => (i === 0 && x.s === '+' ? x.t : `${x.s}${x.t}`)).join('');
  return `${E}(${num})/${W}^${k + 1}`;
}

function multipleData(rng, { t: tt = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const m = pick(rng, [2, 2, 3]);
    const a = pick(rng, [-2, -1, 0, 1, 2]);
    const hasB = rng.chance(0.75);
    const b = hasB ? pick(rng, [-3, -2, -1, 0, 1, 2, 3]) : null;
    if (b === a) continue;
    const g = tt ? 'e^(zt)' : pick(rng, ['1', 'z', 'z', 'e^z', 'e^z']);
    if (g === '1' && !hasB) continue;
    if (g === 'z' && a === 0) continue;
    const env = tt ? { t: 1.3 } : {};
    const fT = `${g === '1' || g === 'z' || g === 'e^z' ? g : `(${g})`}/(${powT(zf(a), m)}${hasB ? zf(b) : ''})`;
    const phi = phiDeriv(g, b, 0);
    const der = phiDeriv(g, b, m - 1);
    // Value at a: substitute z = a in der, then exact text.
    const dAt = der.replace(/z/g, `(${a})`);
    const val = resValue(g, a, b, m);
    if (!val) continue;
    const wrong0 = phiDeriv(g, b, 0).replace(/z/g, `(${a})`);
    void env;
    return { m, a, b, g, f: fT, phi, der, dAt, ...val, wrong0, t: tt, id: `${m}:${a}:${b}:${g}` };
  }
  return null;
}

// The exact residue φ^(m−1)(a)/(m − 1)! as text, and its pieces.
function resValue(g, a, b, m) {
  const k = m - 1;
  const F = fact(k);
  // φ^(k)(a) = E(a)·N where N is a rational number (or a polynomial in t).
  if (b === null) {
    if (g === 'z') { const v = k === 1 ? 1 : 0; return v === 0 ? null : { res: String(q(v, F)), raw: String(v) }; }
    if (g === 'e^z') return { res: F === 1 ? ea(a) : `${ea(a)}/${F}`, raw: ea(a) };
    return { res: `${F === 1 ? '' : `(1/${F})`}${powT('t', k)}${eat(a)}`, raw: `${powT('t', k)}${eat(a)}` };
  }
  const d = a - b;
  if (g === '1') { const v = q((k % 2 ? -1 : 1) * fact(k), d ** (k + 1)); return { res: String(v.div(q(F))), raw: String(v) }; }
  if (g === 'z') { const v = q((k % 2 ? -1 : 1) * fact(k) * b, d ** (k + 1)); if (v.n === 0) return null; return { res: String(v.div(q(F))), raw: String(v) }; }
  // e^(cz)/(z − b) at a: e^(ca) Σ_j C(k,j) c^(k−j) (−1)^j j! d^(−j−1)
  if (g === 'e^z') {
    let s = q(0);
    for (let j = 0; j <= k; j++) s = s.add(q(binom(k, j) * fact(j) * (j % 2 ? -1 : 1), d ** (j + 1)));
    if (s.n === 0) return null;
    const c = s.div(q(F));
    const cT0 = c.eq(1) ? '' : c.eq(-1) ? '-' : c.d === 1 ? `${c.n}` : `(${c})`;
    return { res: a === 0 ? String(c) : `${cT0}${ea(a)}`, raw: null };
  }
  // e^(zt)/(z − b): polynomial in t: Σ_j C(k,j) (−1)^j j!/d^(j+1) t^(k−j), divided by k!
  const terms = [];
  for (let j = 0; j <= k; j++) {
    const c = q(binom(k, j) * fact(j) * (j % 2 ? -1 : 1), d ** (j + 1)).div(q(F));
    if (c.n === 0) continue;
    const tp = k - j === 0 ? '' : powT('t', k - j);
    const ct = c.eq(1) && tp ? '' : c.eq(-1) && tp ? '-' : tp && c.d !== 1 ? `${c.n < 0 ? '-' : ''}(${c.n < 0 ? c.neg() : c})` : `${c}`;
    terms.push(`${ct}${tp}`);
  }
  const poly = terms.reduce((s, x) => (s ? (x.startsWith('-') ? `${s}${x}` : `${s}+${x}`) : x), '');
  return { res: a === 0 ? poly : terms.length === 1 && !/[+-]/.test(poly.slice(1)) ? `${poly}${eat(a)}` : `(${poly})${eat(a)}`, raw: null };
}

const SUB_M = [SG('order', t('ordre m du pôle'), 'c-singularities'), SG('derivative', t('dériver (z − z₀)^m f'), RM), SG('value', t('diviser par (m − 1)!'), RM)];
const phiML = (m, a) => `<msup>${a === 0 ? '<mi>z</mi>' : `<mrow><mo>(</mo>${inner(zMinus(a))}<mo>)</mo></mrow>`}<mn>${m}</mn></msup><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo>`;
const derML = (m) => (m === 2 ? '<msup><mi>φ</mi><mo>′</mo></msup><mo>(</mo><mi>z</mi><mo>)</mo>' : '<msup><mi>φ</mi><mo>″</mo></msup><mo>(</mo><mi>z</mi><mo>)</mo>');

function multipleParts(d, level, { only = false, label = null } = {}) {
  const vars = d.t ? ['t'] : [];
  const tDom = { t: [0.3, 2] };
  const phiJ = CV(mathLabel(`${rd(zf(d.a))}^${d.m}f(z)`, phiML(d.m, d.a)), d.phi, { vars: ['z', ...vars], form: 'any', domain: tDom });
  const derJ = CV(mathLabel(d.m === 2 ? 'φ′(z)' : 'φ″(z)', derML(d.m)), d.der, { vars: ['z', ...vars], form: 'any', domain: tDom });
  const F = fact(d.m - 1);
  const wrongs = {};
  const w0 = d.wrong0;
  if (w0) wrongs.c_simple_formula_double = [{ line: w0, ctx: {} }];
  if (d.m === 3) wrongs.c_multiple_factorial = [{ line: d.dAt, ctx: { m: 3, f: 2 } }, { line: `(${d.dAt})/6`, ctx: { m: 3, f: 2 } }];
  else wrongs.c_multiple_factorial = [{ line: `(${d.dAt})/2`, ctx: { m: 2, f: 1 } }];
  const resJ = CV(label || resLabel(String(d.a)), d.res, { vars, domain: tDom, form: d.t ? 'value' : 'algebraic', traps: wrongs });
  const subst = F === 1 ? d.dAt : `(1/${F})(${d.dAt})`;
  const MENU = [
    { id: 'mult', label: t('Multiplier f par (z − z₀)^{m}', { m: d.m }), valid: true },
    { id: 'der', label: t('Dériver {a} fois', { a: d.m - 1 }), valid: true },
    { id: 'eval', label: t('Évaluer en z₀'), valid: true },
    { id: 'fact', label: t('Diviser par (m − 1)! = {F}', { F }), valid: true },
    { id: 'simple', label: 'Res = lim (z − z₀)f(z)', valid: false, rule: 'c_simple_formula_double', why: t('z₀ est un pôle d\'ordre {m} : (z − z₀)f(z) tend vers l\'infini.', { m: d.m }) },
  ];
  const parts = [];
  if (!only) {
    parts.push({ start: phiJ.label, judge: phiJ, menu: MENU, lines: [L(d.phi, t('z₀ = {a} est un pôle d\'ordre {m} : on simplifie', { a: rd(String(d.a)), m: d.m }), 'order', { blank: [d.phi] })] });
    parts.push({ html: d.m === 2 ? t('φ(z) = (z − z₀)^{m} f(z) = {a}. On dérive une fois :', { m: d.m, a: CM(d.phi) }) : t('φ(z) = (z − z₀)^{m} f(z) = {a}. On dérive deux fois :', { m: d.m, a: CM(d.phi) }), ask: d.m === 2 ? 'φ′(z) =' : 'φ″(z) =', start: derJ.label, judge: derJ, menu: MENU, lines: [L(d.der, t('Dériver'), 'derivative', { blank: [d.der] })] });
  }
  parts.push({ html: only ? '' : t('En z₀ = {a} :', { a: rd(String(d.a)) }), ask: 'Res =', start: resJ.label, judge: resJ, menu: MENU, lines: chain(resJ, [subst, d.res]).map((tt, i, a) => L(tt, i === a.length - 1 ? t('Simplifier') : `1/(m − 1)! · φ${d.m === 2 ? '′' : '″'}(z₀)`, 'value', { blank: [tt] })) });
  if (level >= 2 && level <= 3 && !only) {
    parts[0].decisions = [{
      kind: 'decision', prompt: t('z₀ = {a} : quelle formule ?', { a: rd(String(d.a)) }),
      options: [
        { id: 'multi', label: t('Pôle d\'ordre {m} : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)]', { m: d.m }), valid: true, ref: true },
        { id: 'simple', label: t('Pôle simple : Res = lim (z − z₀)f(z)'), valid: false, rule: 'c_simple_formula_double', why: t('z₀ est un pôle d\'ordre {m} : la limite de (z − z₀)f(z) est infinie.', { m: d.m }) },
      ],
    }];
  }
  return { parts, resJ };
}

function multipleLines(level, rng, opts = {}) {
  const coef = opts.exam === 'coef';
  const d = multipleData(rng) || FALLBACK_M;
  checkRes(d.f, String(d.a), d.res);
  const { parts } = multipleParts(d, level, { only: coef });
  if (level === 1) {
    parts[0].notes = [t('z₀ = {a} est un pôle d\'ordre m = {m}. On pose φ(z) = (z − z₀)^{m} f(z) ; alors Res(f ; z₀) = φ{b}(z₀)/{c}!.', { a: rd(String(d.a)), m: d.m, b: d.m === 2 ? '′' : '″', c: fact(d.m - 1) })];
  }
  return partsItem({
    skill: RM, level, prompt: t('Calcule Res(f ; {a}) pour f(z) = {b}.', { a: CM(String(d.a)), b: CM(d.f) }),
    parts, keys: KEYS, subgoals: SUB_M,
    hints: H(t('Ordre m = {m} : on dérive {a} fois (z − z₀)^{m} f et on divise par {b}!.', { m: d.m, a: d.m - 1, b: fact(d.m - 1) }), `φ(z) = ${CM(d.phi)}, φ${d.m === 2 ? '′' : '″'}(z) = ${CM(d.der)}.`, `Res = ${CM(d.res)}`),
    key: `${RM}:${level}:${d.id}`, exam: examTag(opts, coef ? 2 : 1), fallback: !!d.fallback,
    baits: ['c_simple_formula_double', 'c_multiple_factorial'],
  });
}
const FALLBACK_M = { m: 2, a: 0, b: 1, g: '1', f: '1/((z)^2(z-1))', phi: '1/(z-1)', der: '-1/(z-1)^2', dAt: '-1/((0)-1)^2', res: '-1', raw: '-1', wrong0: '1/((0)-1)', t: false, id: 'fb', fallback: true };

// L5: Laplace inverse e^(zt)/((z − a)²(z − b)): Res at a (double) + Res at b (simple).
function multipleLaplace(level, rng) {
  const a = pick(rng, [-1, -2, 0, 1]);
  let b = pick(rng, [-3, -2, -1, 0, 1, 2]);
  if (b === a) b = a - 1;
  const d = { m: 2, a, b, g: 'e^(zt)', f: `e^(zt)/(${zf(a)}^2${zf(b)})`, phi: phiDeriv('e^(zt)', b, 0), der: phiDeriv('e^(zt)', b, 1), t: true, id: `L:${a}:${b}` };
  d.dAt = d.der.replace(/z/g, `(${a})`);
  Object.assign(d, resValue('e^(zt)', a, b, 2));
  d.wrong0 = d.phi.replace(/z/g, `(${a})`);
  for (const tt of [0.7, 1.9]) checkRes(d.f, String(a), d.res, { t: tt });
  const { parts } = multipleParts(d, level);
  const rb = q(1, (b - a) ** 2);
  const resB = b === 0 ? String(rb) : `${rb.eq(1) ? '' : `(${rb})`}${eat(b)}`;
  for (const tt of [0.7, 1.9]) checkRes(d.f, String(b), resB, { t: tt });
  const JB = CV(resLabel(String(b)), resB, { vars: ['t'], domain: { t: [0.3, 2] }, form: 'value' });
  parts.push({ html: t('Le pôle simple z = {b} :', { b }), ask: 'Res =', start: JB.label, judge: JB, lines: chain(JB, [`e^(${b}t)/((${b})-(${a}))^2`, resB]).map((tt) => L(tt, 'p(z₀)/q′(z₀)', 'value')) });
  const sum = `${d.res}+${resB}`;
  const JS = CV(mathLabel('y(t)', '<mi>y</mi><mo>(</mo><mi>t</mi><mo>)</mo>'), sum, { vars: ['t'], domain: { t: [0.3, 2] }, form: 'value' });
  parts.push({ html: t('La fonction est la somme des résidus :'), ask: 'y(t) =', start: JS.label, judge: JS, lines: [L(sum, t('Somme des résidus'), 'sum')] });
  return partsItem({
    skill: RM, level, prompt: t('Laplace inverse par les résidus : y(t) = Σ Res(e^(zt)F(z)) pour F(z) = {a}, t > 0. Calcule les résidus de {b}, puis y(t).', { a: CM(`1/(${zf(a)}^2${zf(b)})`), b: CM(d.f) }),
    parts, keys: [...KEYS, 'calcx'], subgoals: [...SUB_M, SG('sum', t('somme des résidus'), RM)], hints: [],
    key: `${RM}:5:${d.id}`, baits: ['c_simple_formula_double', 'c_multiple_factorial'],
  });
}

function multipleMcq(rng, opts) {
  const d = multipleData(rng) || FALLBACK_M;
  checkRes(d.f, String(d.a), d.res);
  const multi = !!opts.multi;
  const F = fact(d.m - 1);
  const nice = (tt, rule) => { const x = niceC(tt); return x ? opt(x, rule) : null; };
  const wrongs = [
    nice(d.wrong0, 'c_simple_formula_double'),
    d.m === 3 ? nice(d.dAt, 'c_multiple_factorial') : nice(`(${d.res})/2`, 'c_multiple_factorial'),
    d.m === 3 ? nice(`(${d.dAt})/6`, 'c_multiple_factorial') : null,
    scaledOpt('-1', d.res),
  ];
  return choice({
    skill: RM, level: 4, key: `${RM}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: multi ? t('Soit f(z) = {a}. Res(f ; {b}) = (plusieurs réponses possibles)', { a: CM(d.f), b: CM(String(d.a)) }) : t('Soit f(z) = {a}. Res(f ; {b}) =', { a: CM(d.f), b: CM(String(d.a)) }),
    right: CM(niceC(d.res) || d.res), rightText: d.res, rights: multi && F > 1 ? [CM(`(1/${F})(${d.dAt})`)] : [],
    wrongs, fillers: [scaledOpt('2', d.res), nice(`(${d.res})+1`), scaledOpt('1/2', d.res), scaledOpt('-2', d.res), scaledOpt('3', d.res), scaledOpt('-1/2', d.res)],
    solution: [{ html: t('Pôle d\'ordre {m} : φ(z) = {a}, φ{b}(z) = {c}, Res = {d}.', { m: d.m, a: CM(d.phi), b: d.m === 2 ? '′' : '″', c: CM(d.der), d: CM(d.res) }), note: '' }],
    expectedSec: 150,
  }, rng);
}

export const GEN = {
  [RS]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return simpleMcq(rng, opts);
    if (opts.exam === 'coef') return simpleLines(4, rng, opts);
    if (level === 5) return simpleAll(5, rng);
    return simpleLines(level, rng, opts);
  },
  [RM]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return multipleMcq(rng, opts);
    if (opts.exam === 'coef') return multipleLines(4, rng, opts);
    if (level === 5) return multipleLaplace(5, rng);
    return multipleLines(level, rng, opts);
  },
};
