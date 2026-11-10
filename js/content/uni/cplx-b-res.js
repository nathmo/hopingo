// c-res-simple and c-res-multiple (module C, part b, step U10): residues at
// a simple pole (p(z₀)/q′(z₀)) and at a pole of order m (derivative of
// (z − z₀)^m f). Each value is a `cval` part (js/judges/cplx-cb.js) whose
// start is a label (« Res(f ; i) ») and whose lines must have the
// reference value; derivatives are `cval` parts with vars ['z'] (and t for
// the Laplace inverse of L5). Every reference residue is checked against
// the numeric a₋₁ of js/cas/series.js when VERIFY.on (tests).

import { CQ } from '../../cas/complex.js';
import {
  q, cq, cT, cP, zMinus, rd, CM, inner, resLabel, mathLabel, CV, P, pT, checkRes, SG, L, chain, choice, opt,
  partsItem, H, examTag, KEYS, pick,
} from './cplx-b-kit.js';

const RS = 'c-res-simple';
const RM = 'c-res-multiple';
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

const SUB_S = [SG('derivative', 'q′ et q′(z₀)', RS), SG('value', 'Res = p(z₀)/q′(z₀)', RS)];

function simpleParts(d, level, { only = false } = {}) {
  const dqJ = CV(mathLabel('q′(z)', qpML('<mi>z</mi>')), d.dq, { vars: ['z'], form: 'any' });
  const dq0J = CV(mathLabel(`q′(${rd(d.z0T)})`, qpML(inner(d.z0T))), d.dq0);
  const resJ = CV(resLabel(d.z0T), d.res, d.noExp ? { traps: { c_essential_factor: [{ line: d.noExp, ctx: {} }] } } : {});
  const MENU_D = [
    { id: 'der', label: 'Dériver le dénominateur q', valid: true },
    { id: 'q0', label: 'Calculer q(z₀)', valid: false, why: 'q(z₀) = 0 : c\'est justement le pôle. On dérive q.' },
  ];
  const MENU_E = [
    { id: 'subst', label: 'Remplacer z par z₀ dans q′', valid: true },
    { id: 'calc', label: 'Calculer (i² = −1)', valid: true },
  ];
  const MENU_R = [
    { id: 'div', label: 'Diviser p(z₀) par q′(z₀)', valid: true },
    { id: 'alg', label: 'Écrire sous la forme a + bi (multiplier par le conjugué)', valid: true },
    { id: 'mul', label: 'Multiplier p(z₀) par q′(z₀)', valid: false, why: 'Le résidu est un quotient : p(z₀)/q′(z₀).' },
  ];
  const resLines = chain(resJ, [d.sub, d.res]).map((t, i, a) => L(t, i === a.length - 1 ? 'Simplifier' : `p(z₀) = ${rd(d.pv)}, q′(z₀) = ${rd(d.dq0)}`, 'value', { blank: i === 0 ? [d.dq0] : [t], blank2: [t] }));
  const partRes = {
    html: only ? '' : 'Le résidu :', ask: 'Res =', start: resJ.label, judge: resJ, menu: MENU_R, lines: resLines,
  };
  if (only) return [partRes];
  const decision = {
    kind: 'decision', prompt: 'Quelle formule pour ce pôle simple ?', levels: [2, 3],
    options: [
      { id: 'pq', label: 'Res = p(z₀)/q′(z₀)', valid: true, ref: true },
      d.factored
        ? { id: 'lim', label: 'Res = lim (z − z₀)·f(z)', valid: true, why: 'Juste aussi : q est déjà factorisé, on simplifie par z − z₀.' }
        : { id: 'lim', label: 'Res = lim (z − z₀)·f(z)', valid: true, quality: 'poor', why: `Juste, mais il faudrait factoriser ${rd(d.q)} : p/q′ évite ce calcul.` },
      { id: 'laurent', label: 'Développer f en série de Laurent', valid: true, quality: 'poor', why: 'Juste, mais bien plus long : en un pôle simple, la formule p/q′ suffit.' },
      { id: 'pq0', label: 'Res = p(z₀)/q(z₀)', valid: false, why: 'q(z₀) = 0 : on ne divise pas par q(z₀). C\'est q′(z₀) qui compte.' },
    ],
  };
  return [
    { start: dqJ.label, judge: dqJ, decisions: [decision], menu: MENU_D, lines: [L(d.dq, 'Dériver q', 'derivative', { blank: [d.dq] })] },
    { html: `q′(z) = ${CM(d.dq)}. En z₀ :`, ask: `q′(${rd(d.z0T)}) =`, start: dq0J.label, judge: dq0J, menu: MENU_E, lines: chain(dq0J, [d.dq0Sub, d.dq0]).map((t, i, a) => L(t, i === a.length - 1 ? 'Calculer' : 'Remplacer z par z₀', 'derivative', { blank: [t] })) },
    partRes,
  ];
}

function simpleLines(level, rng, opts = {}) {
  const coef = opts.exam === 'coef';
  const d = simpleData(rng);
  checkRes(fOf(d), d.z0T, d.res);
  const parts = simpleParts(d, level, { only: level === 1 || coef });
  if (level === 1) parts[0].notes = [`Le dénominateur est q(z) = ${CM(d.q)}, q′(z) = ${CM(d.dq)} et q′(${CM(d.z0T)}) = ${CM(d.dq0)}. Le numérateur vaut p(${CM(d.z0T)}) = ${CM(d.pv)}.`];
  return partsItem({
    skill: RS, level, prompt: `z₀ = ${CM(d.z0T)} est un pôle simple de f(z) = ${fML(d)}. Calcule Res(f ; ${CM(d.z0T)}).`,
    parts, keys: KEYS, subgoals: SUB_S,
    hints: H('Pôle simple de p/q : Res(f ; z₀) = p(z₀)/q′(z₀).', `q′(z) = ${CM(d.dq)}, donc q′(${CM(d.z0T)}) = ${CM(d.dq0)}.`, `Res = ${CM(d.sub)} = ${CM(d.res)}`),
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
    parts.push({ html: i ? `Pôle suivant, z = ${CM(cT(pl.z))} :` : '', ask: 'Res =', start: J.label, judge: J, lines: chain(J, [pl.sub, cT(pl.res)]).map((t) => L(t, 'p(z₀)/q′(z₀)', 'value')) });
  });
  return partsItem({
    skill: RS, level, prompt: `Calcule les résidus de f(z) = ${fm} en tous ses pôles du demi-plan ${up ? 'Im z > 0' : 'Im z < 0'}${dq ? '' : ' (ce sont des pôles simples)'}. Commence par le pôle de plus petit module.`,
    parts, keys: KEYS, subgoals: SUB_S, hints: [], key: `${RS}:5:${kind}:${up}:${f}`,
  });
}

function simpleMcq(rng, opts) {
  const d = simpleData(rng, { trig: true });
  checkRes(fOf(d), d.z0T, d.res);
  const multi = !!opts.multi;
  const inv = d.pv === '0' ? null : `(${d.dq0})/(${d.pv})`;
  return choice({
    skill: RS, level: 4, key: `${RS}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: `Soit f(z) = ${fML(d)}. Res(f ; ${CM(d.z0T)}) =${multi ? ' (plusieurs réponses possibles)' : ''}`,
    right: CM(d.res), rights: multi ? [CM(d.sub)] : [],
    wrongs: [d.noExp && opt(d.noExp, 'c_essential_factor'), opt(`-(${d.res})`), inv && opt(inv), opt(`2(${d.res})`)],
    fillers: [opt(`i(${d.res})`), opt(`(${d.res})/2`)],
    solution: [{ html: `Pôle simple : Res = p(z₀)/q′(z₀) = ${CM(d.sub)} = ${CM(d.res)}.`, note: '' }],
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
  if (g === '1') return k === 0 ? `1/(${w})` : `${k % 2 ? '-' : ''}${fact(k)}/(${w})^${k + 1}`;
  if (g === 'z') {
    // z/(z − b) = 1 + b/(z − b)
    if (k === 0) return `z/(${w})`;
    const c = (k % 2 ? -1 : 1) * fact(k) * b;
    return `${c}/(${w})^${k + 1}`;
  }
  // e^(cz)/(z − b): e^(cz) Σ_j C(k,j) c^(k−j) (−1)^j j!/(z − b)^(j+1), c = 1 or t.
  const c = g === 'e^z' ? '' : 't';
  const E = g;
  if (k === 0) return `${E}/(${w})`;
  const terms = [];
  for (let j = 0; j <= k; j++) {
    const coef = binom(k, j) * fact(j) * (j % 2 ? -1 : 1);
    const cp = k - j === 0 ? '' : c ? powT('t', k - j) : '';
    const wp = k - j === 0 ? '' : powT(`(${w})`, k - j);
    let t = `${cp}${wp}`;
    const abs = Math.abs(coef);
    t = abs === 1 ? (t || '1') : `${abs}${t}`;
    terms.push({ s: coef < 0 ? '-' : '+', t });
  }
  const num = terms.map((x, i) => (i === 0 && x.s === '+' ? x.t : `${x.s}${x.t}`)).join('');
  return `${E}(${num})/(${w})^${k + 1}`;
}

function multipleData(rng, { t = false } = {}) {
  for (let tries = 0; tries < 200; tries++) {
    const m = pick(rng, [2, 2, 3]);
    const a = pick(rng, [-2, -1, 0, 1, 2]);
    const hasB = rng.chance(0.75);
    const b = hasB ? pick(rng, [-3, -2, -1, 0, 1, 2, 3]) : null;
    if (b === a) continue;
    const g = t ? 'e^(zt)' : pick(rng, ['1', 'z', 'z', 'e^z', 'e^z']);
    if (g === '1' && !hasB) continue;
    if (g === 'z' && a === 0) continue;
    const env = t ? { t: 1.3 } : {};
    const fT = `${g === '1' ? '1' : `(${g})`}/(${powT(`(${zMinus(a)})`, m)}${hasB ? `(${zMinus(b)})` : ''})`;
    const phi = phiDeriv(g, b, 0);
    const der = phiDeriv(g, b, m - 1);
    // Value at a: substitute z = a in der, then exact text.
    const dAt = der.replace(/z/g, `(${a})`);
    const val = resValue(g, a, b, m);
    if (!val) continue;
    const wrong0 = phiDeriv(g, b, 0).replace(/z/g, `(${a})`);
    void env;
    return { m, a, b, g, f: fT, phi, der, dAt, ...val, wrong0, t, id: `${m}:${a}:${b}:${g}` };
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

const SUB_M = [SG('order', 'ordre m du pôle', 'c-singularities'), SG('derivative', 'dériver (z − z₀)^m f', RM), SG('value', 'diviser par (m − 1)!', RM)];
const phiML = (m, a) => `<msup><mrow><mo>(</mo>${inner(zMinus(a))}<mo>)</mo></mrow><mn>${m}</mn></msup><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo>`;
const derML = (m) => (m === 2 ? '<msup><mi>φ</mi><mo>′</mo></msup><mo>(</mo><mi>z</mi><mo>)</mo>' : '<msup><mi>φ</mi><mo>″</mo></msup><mo>(</mo><mi>z</mi><mo>)</mo>');

function multipleParts(d, level, { only = false, label = null } = {}) {
  const vars = d.t ? ['t'] : [];
  const tDom = { t: [0.3, 2] };
  const phiJ = CV(mathLabel(`(${rd(zMinus(d.a))})^${d.m}f(z)`, phiML(d.m, d.a)), d.phi, { vars: ['z', ...vars], form: 'any', domain: tDom });
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
    { id: 'mult', label: `Multiplier f par (z − z₀)^${d.m}`, valid: true },
    { id: 'der', label: `Dériver ${d.m - 1} fois`, valid: true },
    { id: 'eval', label: 'Évaluer en z₀', valid: true },
    { id: 'fact', label: `Diviser par (m − 1)! = ${F}`, valid: true },
    { id: 'simple', label: 'Res = lim (z − z₀)f(z)', valid: false, rule: 'c_simple_formula_double', why: `z₀ est un pôle d'ordre ${d.m} : (z − z₀)f(z) tend vers l'infini.` },
  ];
  const parts = [];
  if (!only) {
    parts.push({ start: phiJ.label, judge: phiJ, menu: MENU, lines: [L(d.phi, `z₀ = ${d.a} est un pôle d'ordre ${d.m} : on simplifie`, 'order', { blank: [d.phi] })] });
    parts.push({ html: `φ(z) = (z − z₀)^${d.m} f(z) = ${CM(d.phi)}. On dérive ${d.m === 2 ? 'une fois' : 'deux fois'} :`, ask: d.m === 2 ? 'φ′(z) =' : 'φ″(z) =', start: derJ.label, judge: derJ, menu: MENU, lines: [L(d.der, 'Dériver', 'derivative', { blank: [d.der] })] });
  }
  parts.push({ html: only ? '' : `En z₀ = ${d.a} :`, ask: 'Res =', start: resJ.label, judge: resJ, menu: MENU, lines: chain(resJ, [subst, d.res]).map((t, i, a) => L(t, i === a.length - 1 ? 'Simplifier' : `1/(m − 1)! · φ${d.m === 2 ? '′' : '″'}(z₀)`, 'value', { blank: [t] })) });
  if (level >= 2 && level <= 3 && !only) {
    parts[0].decisions = [{
      kind: 'decision', prompt: `z₀ = ${d.a} : quelle formule ?`,
      options: [
        { id: 'multi', label: `Pôle d'ordre ${d.m} : Res = 1/(m − 1)! · lim d^(m−1)/dz^(m−1) [(z − z₀)^m f(z)]`, valid: true, ref: true },
        { id: 'simple', label: 'Pôle simple : Res = lim (z − z₀)f(z)', valid: false, rule: 'c_simple_formula_double', why: `z₀ est un pôle d'ordre ${d.m} : la limite de (z − z₀)f(z) est infinie.` },
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
    parts[0].notes = [`z₀ = ${d.a} est un pôle d'ordre m = ${d.m}. On pose φ(z) = (z − z₀)^${d.m} f(z) ; alors Res(f ; z₀) = φ${d.m === 2 ? '′' : '″'}(z₀)/${fact(d.m - 1)}!.`];
  }
  return partsItem({
    skill: RM, level, prompt: `Calcule Res(f ; ${d.a}) pour f(z) = ${CM(d.f)}.`,
    parts, keys: KEYS, subgoals: SUB_M,
    hints: H(`Ordre m = ${d.m} : on dérive ${d.m - 1} fois (z − z₀)^${d.m} f et on divise par ${fact(d.m - 1)}!.`, `φ(z) = ${CM(d.phi)}, φ${d.m === 2 ? '′' : '″'}(z) = ${CM(d.der)}.`, `Res = ${CM(d.res)}`),
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
  const d = { m: 2, a, b, g: 'e^(zt)', f: `e^(zt)/((${zMinus(a)})^2(${zMinus(b)}))`, phi: phiDeriv('e^(zt)', b, 0), der: phiDeriv('e^(zt)', b, 1), t: true, id: `L:${a}:${b}` };
  d.dAt = d.der.replace(/z/g, `(${a})`);
  Object.assign(d, resValue('e^(zt)', a, b, 2));
  d.wrong0 = d.phi.replace(/z/g, `(${a})`);
  for (const t of [0.7, 1.9]) checkRes(d.f, String(a), d.res, { t });
  const { parts } = multipleParts(d, level);
  const rb = q(1, (b - a) ** 2);
  const resB = b === 0 ? String(rb) : `${rb.eq(1) ? '' : `(${rb})`}${eat(b)}`;
  for (const t of [0.7, 1.9]) checkRes(d.f, String(b), resB, { t });
  const JB = CV(resLabel(String(b)), resB, { vars: ['t'], domain: { t: [0.3, 2] }, form: 'value' });
  parts.push({ html: `Le pôle simple z = ${b} :`, ask: 'Res =', start: JB.label, judge: JB, lines: chain(JB, [`e^(${b}t)/((${b})-(${a}))^2`, resB]).map((t) => L(t, 'p(z₀)/q′(z₀)', 'value')) });
  const sum = `${d.res}+${resB}`;
  const JS = CV(mathLabel('y(t)', '<mi>y</mi><mo>(</mo><mi>t</mi><mo>)</mo>'), sum, { vars: ['t'], domain: { t: [0.3, 2] }, form: 'value' });
  parts.push({ html: 'La fonction est la somme des résidus :', ask: 'y(t) =', start: JS.label, judge: JS, lines: [L(sum, 'Somme des résidus', 'sum')] });
  return partsItem({
    skill: RM, level, prompt: `Laplace inverse par les résidus : y(t) = Σ Res(e^(zt)F(z)) pour F(z) = ${CM(`1/((${zMinus(a)})^2(${zMinus(b)}))`)}, t > 0. Calcule les résidus de ${CM(d.f)}, puis y(t).`,
    parts, keys: [...KEYS, 'calcx'], subgoals: [...SUB_M, SG('sum', 'somme des résidus', RM)], hints: [],
    key: `${RM}:5:${d.id}`, baits: ['c_simple_formula_double', 'c_multiple_factorial'],
  });
}

function multipleMcq(rng, opts) {
  const d = multipleData(rng) || FALLBACK_M;
  checkRes(d.f, String(d.a), d.res);
  const multi = !!opts.multi;
  const F = fact(d.m - 1);
  const wrongs = [
    opt(d.wrong0, 'c_simple_formula_double'),
    d.m === 3 ? opt(d.dAt, 'c_multiple_factorial') : opt(`(${d.res})/2`, 'c_multiple_factorial'),
    d.m === 3 ? opt(`(${d.dAt})/6`, 'c_multiple_factorial') : null,
    opt(`-(${d.res})`),
  ];
  return choice({
    skill: RM, level: 4, key: `${RM}:mcq:${d.id}:${multi}`, exam: examTag(opts, 2), multi,
    prompt: `Soit f(z) = ${CM(d.f)}. Res(f ; ${d.a}) =${multi ? ' (plusieurs réponses possibles)' : ''}`,
    right: CM(d.res), rights: multi && F > 1 ? [CM(`(1/${F})(${d.dAt})`)] : [],
    wrongs, fillers: [opt(`2(${d.res})`), opt(`(${d.res})+1`)],
    solution: [{ html: `Pôle d'ordre ${d.m} : φ(z) = ${CM(d.phi)}, φ${d.m === 2 ? '′' : '″'}(z) = ${CM(d.der)}, Res = ${CM(d.res)}.`, note: '' }],
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
