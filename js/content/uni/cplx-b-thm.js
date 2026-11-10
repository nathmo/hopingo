// c-res-theorem (module C, part b, step U10): ∮_Γ f dz = 2πi Σ Res over the
// singularities inside Γ. f = N/D rational, poles in ℤ or ℤi (one may be
// double), Γ a circle |z − c| = R (c ∈ {0, i, 1}), at level 5 a square or an
// ellipse with 3 or 4 singularities. Parts: where is each pole (decisions,
// levels 2–3), the residues inside (`cval`), the sum 2πi Σ (`cval` with the
// traps c_pole_outside_counted and c_residue_2pii in its configuration).

import {
  q, cq, cT, cP, zMinus, rd, CM, resLabel, mathLabel, CV, P, resRat, checkRes, SG, L, chain, choice, opt,
  partsItem, problemItem, H, examTag, KEYS, pick,
} from './cplx-b-kit.js';

const SK = 'c-res-theorem';
const POOL = [cq(0), cq(1), cq(-1), cq(2), cq(-2), cq(3), cq(-3), cq(0, 1), cq(0, -1), cq(0, 2), cq(0, -2), cq(0), cq(1), cq(-1), cq(1, 1)];

// π·w as a CAS text in the form a + bi: '-4πi/3', '2π-πi/3'.
export function piC(w) {
  const part = (x, i) => {
    const a = x.n < 0 ? x.neg() : x;
    const n = a.n === 1 ? '' : String(a.n);
    return `${n}π${i ? 'i' : ''}${a.d === 1 ? '' : `/${a.d}`}`;
  };
  const re = w.re;
  const im = w.im;
  if (re.n === 0 && im.n === 0) return '0';
  if (im.n === 0) return `${re.n < 0 ? '-' : ''}${part(re, false)}`;
  if (re.n === 0) return `${im.n < 0 ? '-' : ''}${part(im, true)}`;
  return `${re.n < 0 ? '-' : ''}${part(re, false)}${im.n < 0 ? '-' : '+'}${part(im, true)}`;
}
// 2πi·s as text.
export const twoPiI = (s) => piC(s.mul(cq(0, 2)));

// √(x) of a rational as text ('2', '√5', '3/2').
function sqrtT(x) {
  const r = q(x);
  const s = r.sqrt?.();
  if (s) return String(s);
  return `√(${r})`;
}

// The contours: {kind, text (screen), inside(z): 'in'|'out'|'on', dist(z)}.
function circle(c, R) {
  const Rf = R.valueOf();
  return {
    kind: 'circle', c, R, html: `|z${c.isZero() ? '' : ` − ${rd(cT(c))}`.replace('− −', '+ ')}| = ${rd(String(R))}`,
    where(z) { const d = Math.sqrt(z.sub(c).abs2().valueOf()); return Math.abs(d - Rf) < 0.2 ? 'on' : d < Rf ? 'in' : 'out'; },
    ctx(z) { return { z: rd(cT(z)), d: rd(sqrtT(z.sub(c).abs2())), R: rd(String(R)) }; },
  };
}
function square(a) {
  return {
    kind: 'square', a, html: `le carré de sommets ±${a} ± ${a}i`,
    where(z) { const x = Math.abs(z.re.valueOf()); const y = Math.abs(z.im.valueOf()); const m = Math.max(x, y); return Math.abs(m - a) < 0.2 ? 'on' : m < a ? 'in' : 'out'; },
    ctx(z) { return { z: rd(cT(z)), d: 'hors du carré', R: String(a) }; },
  };
}
function ellipse(a, b) {
  return {
    kind: 'ellipse', a, b, html: `l'ellipse x²/${a * a} + y²/${b * b} = 1`,
    where(z) { const x = z.re.valueOf(); const y = z.im.valueOf(); const r = Math.sqrt((x * x) / (a * a) + (y * y) / (b * b)); return Math.abs(r - 1) < 0.12 ? 'on' : r < 1 ? 'in' : 'out'; },
    ctx(z) { return { z: rd(cT(z)), d: 'hors de l\'ellipse', R: `${a} et ${b}` }; },
  };
}

// A rational function with its poles, the contour and the residues.
function thmData(rng, { big = false } = {}) {
  for (let tries = 0; tries < 600; tries++) {
    const k = big ? pick(rng, [3, 4]) : pick(rng, [2, 3, 3]);
    const poles = [];
    while (poles.length < k) { const p = pick(rng, POOL); if (!poles.some((x) => x.eq(p))) poles.push(p); }
    const mult = poles.map(() => 1);
    if (!big && k === 2 && rng.chance(0.3)) mult[0] = 2;
    const N = pick(rng, [P.of(1), P.of(1, 1), P.of(0, 1), P.of(-1, 2), P.of(-2, 1), P.of(2)]);
    if (poles.some((p) => P.ev(N, p).isZero())) continue;
    const D = poles.reduce((acc, p, i) => P.mul(acc, P.pow([p.neg(), cq(1)], mult[i])), [cq(1)]);
    const Gamma = big
      ? (rng.chance(0.5) ? square(pick(rng, [2, 3])) : (() => { const [a, b] = pick(rng, [[3, 2], [2, 1], [3, 1], [4, 2]]); return ellipse(a, b); })())
      : circle(pick(rng, [cq(0), cq(0), cq(0, 1), cq(1)]), pick(rng, [q(1), q(3, 2), q(2), q(5, 2), q(2), q(3)]));
    const where = poles.map((p) => Gamma.where(p));
    if (where.includes('on')) continue;
    const ins = poles.map((p, i) => i).filter((i) => where[i] === 'in');
    const outs = poles.map((p, i) => i).filter((i) => where[i] === 'out');
    if (!ins.length || !outs.length) continue;
    const res = poles.map((p) => resRat(N, D, p));
    const S = ins.reduce((s, i) => s.add(res[i]), cq(0));
    const Sall = res.reduce((s, r) => s.add(r), cq(0));
    if (S.isZero() || Sall.eq(S)) continue;
    // Beautiful numbers: small denominators.
    const small = (c) => c.re.d <= 12 && c.im.d <= 12;
    if (!ins.every((i) => small(res[i])) || !small(S) || !small(Sall)) continue;
    const num = P.deg(N) === 0 ? cT(N[0]) : `(${P.deg(N) ? pTsimple(N) : cT(N[0])})`;
    const den = poles.map((p, i) => (mult[i] === 2 ? `(${zMinus(p)})^2` : (p.isZero() ? 'z' : `(${zMinus(p)})`))).join('');
    const f = `${num}/(${den})`;
    return { poles, mult, N, D, f, Gamma, where, ins, outs, res, S, Sall, id: `${f}|${Gamma.html}` };
  }
  return null;
}
function pTsimple(N) {
  // a + bz with integers: 'z+1', '2z-1'.
  const a = N[0];
  const b = N[1];
  const bz = b.eq(1) ? 'z' : b.eq(-1) ? '-z' : `${cT(b)}z`;
  return a.isZero() ? bz : `${bz}${a.re.n < 0 ? '-' : '+'}${cT(a.re.n < 0 ? a.neg() : a)}`;
}

// p(z_k)/Π(z_k − z_j) as text for a simple pole.
function subText(d, i) {
  const p = d.poles[i];
  const fs = d.poles.map((z, j) => (j === i ? null : d.mult[j] === 2 ? `(${cT(p.sub(z))})^2` : `(${cT(p.sub(z))})`)).filter(Boolean);
  return `${cP(P.ev(d.N, p))}/(${fs.join('')})`;
}

const SUBS = [SG('locate', 'singularités à l\'intérieur de Γ', 'c-cauchy-thm'), SG('residue-s', 'résidu en un pôle simple', 'c-res-simple'), SG('residue-m', 'résidu en un pôle double', 'c-res-multiple'), SG('sum', '∮ = 2πi Σ Res', SK)];

function thmParts(d, level, { title = '' } = {}) {
  const parts = [];
  const value = twoPiI(d.S);
  const sumT = d.ins.length === 1 ? cT(d.res[d.ins[0]]) : d.ins.map((i) => cP(d.res[i])).join('+');
  const outsideAll = twoPiI(d.Sall);
  const traps = {
    c_pole_outside_counted: [{ line: `2πi(${d.poles.map((p, i) => cP(d.res[i])).join('+')})`, ctx: d.Gamma.ctx(d.poles[d.outs[0]]) }],
    c_residue_2pii: [cT(d.S), `πi(${sumT})`],
  };
  void outsideAll;
  const decisions = d.poles.map((p, i) => ({
    kind: 'decision', prompt: `z = ${rd(cT(p))} :`, levels: [2, 3],
    options: [
      { id: 'in', label: 'à l\'intérieur de Γ', valid: d.where[i] === 'in', rule: d.where[i] === 'in' ? undefined : 'c_pole_outside_counted', why: d.where[i] === 'in' ? undefined : `${rd(cT(p))} est hors de Γ : il ne compte pas.` },
      { id: 'out', label: 'à l\'extérieur de Γ', valid: d.where[i] === 'out', why: d.where[i] === 'out' ? undefined : `${rd(cT(p))} est à l'intérieur de Γ.` },
      { id: 'on', label: 'sur Γ', valid: false, rule: 'c_pole_on_contour', why: `${rd(cT(p))} n'est pas sur Γ (sinon l'intégrale ne serait pas définie).` },
    ],
  }));
  const MENU = [
    { id: 'loc', label: 'Garder les pôles à l\'intérieur de Γ', valid: true },
    { id: 'res', label: 'Calculer le résidu (formule du pôle)', valid: true },
    { id: 'sum', label: 'Multiplier la somme des résidus intérieurs par 2πi', valid: true },
    { id: 'all', label: 'Additionner les résidus de tous les pôles', valid: false, rule: 'c_pole_outside_counted', why: 'Seuls les pôles à l\'intérieur de Γ comptent.' },
  ];
  d.ins.forEach((i, k) => {
    const p = d.poles[i];
    const J = CV(resLabel(cT(p)), cT(d.res[i]));
    const sg = d.mult[i] === 2 ? 'residue-m' : 'residue-s';
    const lines = d.mult[i] === 2 ? [cT(d.res[i])] : chain(J, [subText(d, i), cT(d.res[i])]);
    parts.push({
      html: k === 0 ? title : `Résidu en ${CM(cT(p))} :`, ask: 'Res =', start: J.label, judge: J, menu: MENU,
      decisions: k === 0 ? decisions : [],
      lines: lines.map((t, j) => L(t, d.mult[i] === 2 ? 'Pôle double : dériver (z − z₀)² f' : j === lines.length - 1 ? 'Calculer' : 'Pôle simple : N(z₀)/Π(z₀ − z_j)', sg, { blank: [t] })),
    });
  });
  const JS = CV(mathLabel('∮_Γ f(z) dz', '<msub><mo>∮</mo><mi>Γ</mi></msub><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo><mi>d</mi><mi>z</mi>'), value, { traps });
  const sumLines = chain(JS, [`2πi(${sumT})`, value]);
  parts.push({
    html: 'Théorème des résidus :', ask: '∮ =', start: JS.label, judge: JS, menu: MENU,
    lines: sumLines.map((t, j) => L(t, j === sumLines.length - 1 ? 'Calculer' : `Pôles intérieurs : ${d.ins.map((i) => rd(cT(d.poles[i]))).join(', ')}`, j === sumLines.length - 1 ? 'sum' : 'locate', { blank: [t] })),
  });
  return parts;
}

const prompt = (d) => `Calcule ∮_Γ f(z) dz pour f(z) = ${CM(d.f)} et Γ = ${d.Gamma.kind === 'circle' ? `le cercle ${d.Gamma.html}` : d.Gamma.html}, parcouru une fois dans le sens positif.`;

function thmLines(level, rng, opts = {}) {
  const d = thmData(rng, { big: level === 5 }) || FALLBACK();
  d.ins.forEach((i) => checkRes(d.f, cT(d.poles[i]), cT(d.res[i])));
  const parts = thmParts(d, level);
  if (level === 1) {
    parts[0].notes = [`Singularités : ${d.poles.map((p, i) => `${CM(cT(p))}${d.mult[i] === 2 ? ' (pôle double)' : ''}`).join(', ')}. À l'intérieur de Γ : ${d.ins.map((i) => CM(cT(d.poles[i]))).join(', ')} ; dehors : ${d.outs.map((i) => CM(cT(d.poles[i]))).join(', ')}.`];
  }
  return partsItem({
    skill: SK, level, prompt: prompt(d), parts, keys: KEYS, subgoals: SUBS,
    hints: H('Seuls les pôles à l\'intérieur de Γ comptent : compare leur distance au centre avec le rayon.', `∮ = 2πi (${d.ins.map((i) => `Res(f ; ${rd(cT(d.poles[i]))})`).join(' + ')})`, `${d.ins.map((i) => `Res(f ; ${CM(cT(d.poles[i]))}) = ${CM(cT(d.res[i]))}`).join(' ; ')}`),
    key: `${SK}:${level}:${d.id}`, exam: examTag(opts), fallback: !!d.fallback,
    baits: ['c_pole_outside_counted', 'c_residue_2pii'],
  });
}
const FALLBACK = () => {
  const poles = [cq(0), cq(1), cq(3)];
  const N = P.of(1, 1);
  const D = P.fromRoots(poles);
  const res = poles.map((p) => resRat(N, D, p));
  return { poles, mult: [1, 1, 1], N, D, f: '(z+1)/(z(z-1)(z-3))', Gamma: circle(cq(0), q(2)), where: ['in', 'in', 'out'], ins: [0, 1], outs: [2], res, S: res[0].add(res[1]), Sall: res[0].add(res[1]).add(res[2]), id: 'fb', fallback: true };
};

// Open (2022, 5 points): the same f on two contours.
function thmOpen(level, rng, opts = {}) {
  for (let t = 0; t < 200; t++) {
    const d1 = thmData(rng);
    if (!d1) continue;
    // A second circle with another set of inside poles.
    const G2 = circle(pick(rng, [cq(0), cq(0, 1), cq(1), cq(-1)]), pick(rng, [q(1, 2), q(1), q(3, 2), q(2), q(3), q(4)]));
    const where = d1.poles.map((p) => G2.where(p));
    if (where.includes('on')) continue;
    const ins = d1.poles.map((p, i) => i).filter((i) => where[i] === 'in');
    const outs = d1.poles.map((p, i) => i).filter((i) => where[i] === 'out');
    if (!ins.length || !outs.length || ins.join() === d1.ins.join()) continue;
    const S = ins.reduce((s, i) => s.add(d1.res[i]), cq(0));
    if (S.isZero() || S.eq(d1.Sall)) continue;
    const d2 = { ...d1, Gamma: G2, where, ins, outs, S };
    const mk = (d, k) => partsItem({ skill: SK, level, prompt: `Contour Γ${k} = ${d.Gamma.kind === 'circle' ? `le cercle ${d.Gamma.html}` : d.Gamma.html}.`, parts: thmParts(d, 4), keys: KEYS, subgoals: SUBS, hints: [], key: `${SK}:o${k}:${d.id}` });
    d1.ins.forEach((i) => checkRes(d1.f, cT(d1.poles[i]), cT(d1.res[i])));
    return problemItem({
      skill: SK, level, key: `${d1.id}|${G2.html}`, exam: opts.exam ? examTag(opts, 5) : false,
      prompt: `Soit f(z) = ${CM(d1.f)}. Calcule ∮ f(z) dz sur deux contours parcourus dans le sens positif (format 2022, 5 points).`,
      parts: [{ item: mk(d1, 1), points: 2.5, title: `Γ₁ : ${d1.Gamma.html}` }, { item: mk(d2, 2), points: 2.5, title: `Γ₂ : ${G2.html}` }],
    });
  }
  return thmLines(4, rng, opts);
}

// Multiple choice: the value; with opts.multi, « for which f is ∮ = 0 ? » (C2).
const ZERO_POOL = [
  { f: 'cos(z)/z^2', zero: true }, { f: '1/(z-3)^2', zero: true }, { f: 'sin(z)/z^3', zero: true }, { f: 'e^z/(z-2)', zero: true },
  { f: 'z^2+1/z^2', zero: true }, { f: '1/z', zero: false }, { f: 'e^z/z', zero: false }, { f: 'cos(z)/z', zero: false },
  { f: '1/(z(z-1))', zero: false, rule: 'c_pole_on_contour' }, { f: '1/(z+1)', zero: false, rule: 'c_pole_on_contour' }, { f: 'sin(z)/z^2', zero: false },
];
function thmMcq(rng, opts) {
  if (opts.multi) {
    const pool = rng.shuffle(ZERO_POOL);
    const rights = pool.filter((x) => x.zero).slice(0, pick(rng, [2, 3]));
    const wrongs = pool.filter((x) => !x.zero).slice(0, 5 - rights.length);
    return choice({
      skill: SK, level: 4, key: `${SK}:mcq:multi:${rights.map((x) => x.f).join()}`, exam: examTag(opts, 2), multi: true, count: 5,
      prompt: 'Pour quelles fonctions a-t-on ∮_{|z| = 1} f(z) dz = 0 (cercle parcouru une fois dans le sens positif) ? (plusieurs réponses possibles)',
      right: CM(rights[0].f), rights: rights.slice(1).map((x) => CM(x.f)),
      wrongs: wrongs.map((x) => opt(x.f, x.rule || null)),
      solution: [{ html: 'La somme des résidus intérieurs est nulle pour les bonnes réponses ; 1/(z(z − 1)) et 1/(z + 1) ont un pôle sur le cercle : l\'intégrale n\'est pas définie.', note: '' }],
      expectedSec: 150,
    }, rng);
  }
  const d = thmData(rng) || FALLBACK();
  d.ins.forEach((i) => checkRes(d.f, cT(d.poles[i]), cT(d.res[i])));
  const v = twoPiI(d.S);
  return choice({
    skill: SK, level: 4, key: `${SK}:mcq:${d.id}`, exam: examTag(opts, 2),
    prompt: `${prompt(d)} ∮_Γ f(z) dz =`,
    right: CM(v),
    wrongs: [opt(twoPiI(d.Sall), 'c_pole_outside_counted'), opt(cT(d.S), 'c_residue_2pii'), opt(piC(d.S.mul(cq(0, 1))), 'c_residue_2pii'), opt(twoPiI(d.S.neg()))],
    fillers: [opt(twoPiI(d.S.mul(2))), opt('0')],
    solution: [{ html: `Pôles intérieurs : ${d.ins.map((i) => CM(cT(d.poles[i]))).join(', ')} ; ∮ = 2πi × (${d.ins.map((i) => CM(cT(d.res[i]))).join(' + ')}) = ${CM(v)}.`, note: '' }],
    expectedSec: 180,
  }, rng);
}

export const GEN = {
  [SK]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return thmMcq(rng, opts);
    if (opts.exam === 'open') return thmOpen(5, rng, opts);
    return thmLines(level, rng, opts);
  },
};
