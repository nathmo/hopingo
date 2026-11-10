// Generators of module A2, part c (step U6): the Taylor polynomial of order
// 2 in two variables (a2-taylor2). Catalogue: docs/universite/A2-analyse-2.md.
//
// f = φ(u) with φ ∈ {cos, sin, exp, ln(1 + ·), 1/(1 − ·)} and u a polynomial
// of degree ≤ 2 in X = x − a, Y = y − b without constant term, so that
//   p₂ = c₀ + c₁(u₁ + u₂) + c₂u₁²   (φ(t) = c₀ + c₁t + c₂t² + …, u₁, u₂ the
// parts of degree 1 and 2 of u), every coefficient exact.
// Judges: series in u for the DL of φ; equiv with cfg.jet (lines compared by
// their Taylor polynomials of order 2 at the point, js/cas/jet.js) and the
// target taylor2 for p₂; value for f(a, b), f_x(a, b)… and for f_xy read on p₂
// (the trap a2_taylor_cross reads cfg.taylor).

import { Q } from '../../math/rational.js';
import { JUDGES, readWith } from '../../judges/index.js';
import { sameLine } from '../../judges/common.js';
import {
  q, qt, fq, H, nz, ML, RD, polyT, ptT,
  partsItem, examMcq, tfItem, vfMcq, a2Counter, coefLines, examTag,
} from './analyse2-c-kit.js';

const TY = 'a2-taylor2';
const TY_SUB = [
  { id: 'inner', label: 'u petit, composée', skill: 'a1-dl-compose' },
  { id: 'outer-dl', label: 'DL de la fonction extérieure', skill: 'a1-dl-ops' },
  { id: 'truncate', label: 'tronquer à l\'ordre 2', skill: 'a1-dl-compose' },
  { id: 'derivs', label: 'dérivées partielles au point', skill: 'a2-partials' },
  { id: 'compose', label: 'polynôme de Taylor', skill: TY },
  { id: 'collect', label: 'regrouper', skill: TY },
];
const XY = ['x', 'y'];

// φ(t) = c₀ + c₁t + c₂t² + …
const PHIS = {
  cos: { c: [1, 0, q(-1, 2)], f: (u) => `cos(${u})`, dl: 'cos(u)', name: 'cos u' },
  sin: { c: [0, 1, 0], f: (u) => `sin(${u})`, dl: 'sin(u)', name: 'sin u' },
  exp: { c: [1, 1, q(1, 2)], f: (u) => `e^(${u})`, dl: 'e^u', name: 'eᵘ' },
  ln: { c: [0, 1, q(-1, 2)], f: (u) => (u.startsWith('-') ? `ln(1${u})` : `ln(1+${u})`), dl: 'ln(1+u)', name: 'ln(1 + u)' },
  inv: { c: [1, 1, 1], f: (u) => `1/(1-(${u}))`, dl: '1/(1-u)', name: '1/(1 − u)' },
};

// Texts of X, Y, X², XY, Y² at the point (a, b).
function monos(a, b) {
  const X = a === 0 ? 'x' : `(x${a > 0 ? '-' : '+'}${Math.abs(a)})`;
  const Y = b === 0 ? 'y' : `(y${b > 0 ? '-' : '+'}${Math.abs(b)})`;
  return { X, Y, XX: `${X}^2`, XY: a === 0 && b === 0 ? 'xy' : `${X}${Y}`, YY: `${Y}^2` };
}
// Σ k·mono (keys k0, X, Y, XX, XY, YY), as text.
function p2T(k, a, b, keys = ['k0', 'X', 'Y', 'XX', 'XY', 'YY']) {
  const M = monos(a, b);
  let out = '';
  for (const key of keys) {
    const c = q(k[key] ?? 0);
    if (c.n === 0) continue;
    if (key === 'k0') { out += c.n < 0 ? qt(c) : `${out ? '+' : ''}${qt(c)}`; continue; }
    const abs = c.n < 0 ? c.neg() : c;
    const coef = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
    out += `${c.n < 0 ? '-' : out ? '+' : ''}${coef}${M[key]}`;
  }
  return out || '0';
}

// u at (a, b): its X, Y coefficients, its text in x, y (expanded).
function uData(rng) {
  const a1 = rng.int(-3, 3);
  const b1 = rng.int(-3, 3);
  const quad = rng.pick([0, 1, 1, 2]);
  const u2 = { XX: 0, XY: 0, YY: 0 };
  const keys = rng.shuffle(['XX', 'XY', 'YY']).slice(0, quad);
  for (const k of keys) u2[k] = nz(rng, -2, 2);
  return { X: a1, Y: b1, ...u2 };
}
// u written in x, y around (a, b): a1·(x − a) + … expanded, as terms.
function uTerms(u, a, b) {
  const x2 = q(u.XX);
  const xy = q(u.XY);
  const y2 = q(u.YY);
  const x1 = q(u.X).sub(x2.mul(2 * a)).sub(xy.mul(b));
  const y1 = q(u.Y).sub(y2.mul(2 * b)).sub(xy.mul(a));
  const c0 = q(-u.X * a - u.Y * b).add(x2.mul(a * a)).add(xy.mul(a * b)).add(y2.mul(b * b));
  return [{ c: x1, e: [1, 0] }, { c: y1, e: [0, 1] }, { c: x2, e: [2, 0] }, { c: xy, e: [1, 1] }, { c: y2, e: [0, 2] }, { c: c0, e: [0, 0] }];
}
const uText = (u, a, b) => polyT(uTerms(u, a, b), XY);
// f = φ(u) as text; ln(1 + u) and 1/(1 − u) with their constant merged: ln(4 − 2x + …).
function fText(kind, u, a, b) {
  const ts = uTerms(u, a, b);
  const c0 = ts[5].c;
  const rest = ts.slice(0, 5);
  if (kind === 'ln') return `ln(${polyT([{ c: c0.add(1), e: [0, 0] }, ...rest], XY)})`;
  if (kind === 'inv') return `1/(${polyT([{ c: q(1).sub(c0), e: [0, 0] }, ...rest.map((t) => ({ c: t.c.neg(), e: t.e }))], XY)})`;
  return PHIS[kind].f(polyT(ts, XY));
}

function taylorData(rng, { at = [0, 0], kinds = ['cos', 'exp', 'ln', 'inv', 'exp', 'ln', 'cos', 'sin'], needXY = false } = {}) {
  for (let t = 0; t < 200; t++) {
    const kind = rng.pick(kinds);
    const P = PHIS[kind];
    const u = uData(rng);
    if (u.X === 0 && u.Y === 0) continue;
    const [c0, c1, c2] = P.c.map((x) => q(x));
    const k = {
      k0: c0, X: c1.mul(u.X), Y: c1.mul(u.Y),
      XX: c1.mul(u.XX).add(c2.mul(u.X * u.X)), XY: c1.mul(u.XY).add(c2.mul(2 * u.X * u.Y)), YY: c1.mul(u.YY).add(c2.mul(u.Y * u.Y)),
    };
    const all = Object.values(k);
    if (all.some((c) => Math.abs(c.n) > 20 * c.d || c.d > 4)) continue;
    if (k.XX.n === 0 && k.XY.n === 0 && k.YY.n === 0) continue;
    if (needXY && k.XY.n === 0) continue;
    const [a, b] = at;
    const U = uText(u, a, b);
    const U1 = polyT([{ c: q(u.X), e: [1, 0] }, { c: q(u.Y), e: [0, 1] }], XY);
    const f = fText(kind, u, a, b);
    return { kind, P, u, U, U1, k, a, b, f, c: [c0, c1, c2], d: { f: c0, fx: k.X, fy: k.Y, fxx: k.XX.mul(2), fxy: k.XY, fyy: k.YY.mul(2) } };
  }
  // Secours (2020 Q11): cos(2x + 3y + y²) → 1 − 2x² − 6xy − 9y²/2.
  const k = { k0: q(1), X: q(0), Y: q(0), XX: q(-2), XY: q(-6), YY: q(-9, 2) };
  const u = { X: 2, Y: 3, XX: 0, XY: 0, YY: 1 };
  return { kind: 'cos', P: PHIS.cos, u, U: '2x+3y+y^2', U1: '2x+3y', k, a: 0, b: 0, f: 'cos(2x+3y+y^2)', c: [q(1), q(0), q(-1, 2)], d: { f: q(1), fx: q(0), fy: q(0), fxx: q(-4), fxy: q(-6), fyy: q(-9) }, fallback: true };
}
const jetJudge = (d) => ({ kind: 'equiv', vars: XY, jet: { at: { x: d.a, y: d.b }, order: 2 }, target: 'taylor2' });
const final = (d) => p2T(d.k, d.a, d.b);
// c·body as a term, body already a factor: +(1/2)(…)^2, −(…), +3(…).
function cterm(c, body, first = false) {
  const a = q(c);
  if (a.n === 0) return '';
  const abs = a.n < 0 ? a.neg() : a;
  const coef = abs.eq(1) ? '' : abs.d === 1 ? qt(abs) : `(${qt(abs)})`;
  return `${a.n < 0 ? '-' : first ? '' : '+'}${coef}${body}`;
}

// The DL in u of the outer function, as a line of the series judge.
function outerDL(d) {
  const [c0, c1, c2] = d.c;
  return `${polyT([{ c: c0, e: [0] }, { c: c1, e: [1] }, { c: c2, e: [2] }], ['u'])}+o(u^2)`;
}
// The DL lines of p₂ (judge equiv with jet).
function dlLines(d, level) {
  const [c0, c1, c2] = d.c;
  const head = (rest) => `${c0.n === 0 ? '' : qt(c0)}${rest}`.replace(/^\+/, '');
  const lines = [];
  const uFull = cterm(c1, `(${d.U})`, c0.n === 0) + (c2.n === 0 ? '' : cterm(c2, `(${d.U})^2`, c0.n === 0 && c1.n === 0));
  lines.push({ math: head(uFull), note: `${d.P.name} avec u = ${RD(d.U, XY)}`, subgoal: 'inner', blank: level === 1 ? [`(${d.U})`] : [] });
  const quad = d.u.XX || d.u.XY || d.u.YY;
  if (c2.n !== 0 && quad) {
    lines.push({ math: head(cterm(c1, `(${d.U})`, c0.n === 0) + cterm(c2, `(${d.U1})^2`, c0.n === 0 && c1.n === 0)), note: `u² = (${RD(d.U1, XY)})² + (degré ≥ 3)`, subgoal: 'truncate', blank: level === 1 ? [`(${d.U1})^2`] : [] });
  }
  if (c2.n !== 0 && d.u.X !== 0 && d.u.Y !== 0) {
    const sq = polyT([{ c: q(d.u.X * d.u.X), e: [2, 0] }, { c: q(2 * d.u.X * d.u.Y), e: [1, 1] }, { c: q(d.u.Y * d.u.Y), e: [0, 2] }], XY);
    lines.push({ math: head(cterm(c1, `(${d.U})`, c0.n === 0) + cterm(c2, `(${sq})`, c0.n === 0 && c1.n === 0)), note: `(${RD(d.U1, XY)})² développé`, subgoal: 'compose' });
  }
  lines.push({ math: final(d), note: 'Termes regroupés', subgoal: 'collect' });
  // A line equal to the previous one (nothing to develop) is dropped, and
  // the solution stops at the first line already in final form.
  const cfg = jetJudge(d);
  const fin = (l) => JUDGES.equiv.isFinal(cfg, readWith(cfg, l.math));
  // (A line « right but to tidy » is left out: the next one tidies it.)
  const out = [];
  for (const l of lines.filter((x) => typeof fin(x) !== 'string')) {
    // Two lines that differ only by brackets are one step: keep the later.
    if (out.length && sameLine(readWith(cfg, l.math), readWith(cfg, out[out.length - 1].math))) out.pop();
    out.push(l);
  }
  const end = out.findIndex((l) => fin(l) === true);
  return end >= 0 ? out.slice(0, end + 1) : out;
}

const METHOD = {
  kind: 'decision', prompt: 'Quelle méthode ?', levels: [3], options: [
    { id: 'dl', label: 'DL à une variable de la fonction extérieure (u petit)', valid: true, ref: true },
    { id: 'derivs', label: 'Les six dérivées partielles en (0, 0)', valid: true, why: 'Juste aussi, mais plus long : il faut dériver deux fois une composée.' },
    { id: 'all', label: 'Développer u² en entier et tout garder', valid: false, rule: 'a2_taylor_no_truncate', why: 'p₂ ne garde que le degré ≤ 2 : les termes de degré 3 et 4 de u² partent dans le reste.' },
  ],
};
const DL_MENU = [
  { id: 'dl', label: 'Remplacer par le DL en u', valid: true },
  { id: 'truncate', label: 'Tronquer : garder le degré ≤ 2', valid: true },
  { id: 'collect', label: 'Développer et regrouper', valid: true },
  { id: 'nohalf', label: 'Oublier le ½ du DL', valid: false, rule: 'a2_taylor_no_half', why: 'Le DL a ses coefficients : cos u = 1 − u²/2, eᵘ = 1 + u + u²/2.' },
];

function dlItem(level, rng, opts = {}) {
  const d = taylorData(rng, { needXY: level === 5 });
  const lines = dlLines(d, level);
  const parts = [
    { start: d.P.dl, judge: { kind: 'series', v: 'u', at: 0, order: 2 }, decisions: [METHOD],
      notes: level <= 2 ? [`On pose u = ${ML(d.U)} : u(0, 0) = 0, donc u est petit près de (0, 0).`] : [],
      menu: [{ id: 'dl', label: 'DL usuel à l\'ordre 2', valid: true }],
      lines: [{ math: outerDL(d), note: 'DL usuel à l\'ordre 2', subgoal: 'outer-dl', blank: level === 1 ? [outerDL(d).replace(/\+o\(u\^2\)$/, '')] : [] }] },
    { html: 'Le polynôme de Taylor d\'ordre 2 de f en (0, 0) :', ask: 'p₂ =', start: d.f, judge: jetJudge(d), menu: DL_MENU, lines },
  ];
  if (level === 5) {
    parts.push({ html: 'Lis sur p₂ la dérivée croisée :', ask: '∂²f/∂x∂y(0, 0) =', start: 'f_xy', judge: { kind: 'value', expect: qt(d.d.fxy), taylor: { fxy: qt(d.d.fxy) } },
      lines: [{ math: qt(d.d.fxy), note: 'Coefficient de xy = f_xy(0, 0)', subgoal: 'compose' }] });
  }
  return partsItem({
    skill: TY, level, parts, subgoals: TY_SUB, key: `${TY}:dl:${d.f}`, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(d.f)}. Calcule son polynôme de Taylor d'ordre 2 en (0, 0)${level === 5 ? ', puis ∂²f/∂x∂y(0, 0)' : ''}.`,
    hints: H(`Écris f = ${d.P.name} avec u = ${ML(d.U)} petit, et utilise le DL de ${d.P.name} à l'ordre 2.`, d.c[2].n !== 0 ? `u² ne garde que (${ML(d.U1)})²` : 'Garde les termes de degré ≤ 2 de u', `p₂ = ${ML(final(d))}`),
  });
}

// The derivatives at (a, b), then the formula (levels 2 and 4).
function derivItem(level, rng) {
  const at = level === 4 ? rng.pick([[1, 1], [1, 0], [0, 1], [1, -1], [-1, 1]]) : [0, 0];
  const d = taylorData(rng, { at });
  const { a, b } = d;
  const M = monos(a, b);
  const pt = ptT([a, b]);
  const D = d.d;
  const n = (x) => `(${qt(x)})`;
  const formula = `${qt(D.f)}+${n(D.fx)}${M.X}+${n(D.fy)}${M.Y}+(1/2)(2${n(D.fxy)}${M.X}${M.Y}+${n(D.fxx)}${M.XX}+${n(D.fyy)}${M.YY})`;
  const val = (key, label, x) => ({ html: `${label}${pt} :`, ask: `${label}${pt} =`, start: key, judge: { kind: 'value', expect: qt(x) }, menu: [{ id: 'd', label: 'Dériver, puis remplacer par le point', valid: true }], lines: [{ math: qt(x), note: '', subgoal: 'derivs' }] });
  const parts = [
    { start: 'f', judge: { kind: 'value', expect: qt(D.f) }, menu: [{ id: 'd', label: 'Remplacer par le point', valid: true }], lines: [{ math: qt(D.f), note: `f${pt}`, subgoal: 'derivs' }] },
    val('f_x', '∂f/∂x', D.fx), val('f_y', '∂f/∂y', D.fy), val('f_xx', '∂²f/∂x²', D.fxx), val('f_xy', '∂²f/∂x∂y', D.fxy), val('f_yy', '∂²f/∂y²', D.fyy),
    { html: 'Le polynôme de Taylor :', ask: 'p₂ =', start: d.f, judge: jetJudge(d),
      menu: [{ id: 'formula', label: 'p₂ = f + f_x·X + f_y·Y + ½(2f_xy·XY + f_xx·X² + f_yy·Y²)', valid: true }, { id: 'collect', label: 'Développer et regrouper', valid: true }, { id: 'nohalf', label: 'p₂ = f + f_x·X + f_y·Y + f_xx·X² + 2f_xy·XY + f_yy·Y²', valid: false, rule: 'a2_taylor_no_half', why: 'Les dérivées secondes sont divisées par 2 (comme f″/2 à une variable).' }],
      lines: [
        { math: formula, note: `X = ${a === 0 ? 'x' : `x − ${fq(a)}`.replace('− −', '+ ')}, Y = ${b === 0 ? 'y' : `y − ${fq(b)}`.replace('− −', '+ ')}`, subgoal: 'compose', blank: level <= 2 ? ['1/2', '2'] : [] },
        { math: final(d), note: 'Le ½ et le 2 du terme croisé se simplifient : le coefficient de XY est f_xy', subgoal: 'collect' },
      ] },
  ];
  return partsItem({
    skill: TY, level, parts, subgoals: TY_SUB, key: `${TY}:derivs:${d.f}:${at}`, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(d.f)}. Calcule les dérivées partielles d'ordre 1 et 2 de f en ${pt}, puis son polynôme de Taylor d'ordre 2 en ${pt}${a || b ? `, en puissances de ${RD(M.X.replace(/^\((.*)\)$/, '$1'), XY)} et ${RD(M.Y.replace(/^\((.*)\)$/, '$1'), XY)}` : ''}.`,
    hints: H('p₂ = f + f_x·X + f_y·Y + ½(f_xx·X² + 2f_xy·XY + f_yy·Y²), toutes les dérivées prises au point.', `f${pt} = ${fq(D.f)}, ∂f/∂x${pt} = ${fq(D.fx)}, ∂f/∂y${pt} = ${fq(D.fy)}`, `p₂ = ${ML(final(d))}`),
  });
}

function taylorMcq(level, rng, opts) {
  const d = taylorData(rng, { needXY: true, kinds: ['cos', 'exp', 'ln', 'inv'] });
  const { k } = d;
  const P = (kk) => ML(p2T(kk, 0, 0));
  const [c0, c1, c2] = d.c;
  // No truncation: c₂·u² developed entirely (degrees 3 and 4 kept).
  const u = d.u;
  const full = (() => {
    const quad = u.XX || u.XY || u.YY;
    if (!quad || c2.n === 0) return null;
    const lin = [{ c: c1.mul(u.X), e: [1, 0] }, { c: c1.mul(u.Y), e: [0, 1] }, { c: c1.mul(u.XX), e: [2, 0] }, { c: c1.mul(u.XY), e: [1, 1] }, { c: c1.mul(u.YY), e: [0, 2] }];
    // u² term by term.
    const ts = [[u.X, [1, 0]], [u.Y, [0, 1]], [u.XX, [2, 0]], [u.XY, [1, 1]], [u.YY, [0, 2]]].filter(([c]) => c);
    const sq = new Map();
    for (const [ca, ea] of ts) for (const [cb, eb] of ts) { const e = [ea[0] + eb[0], ea[1] + eb[1]]; sq.set(e.join(), (sq.get(e.join()) ?? q(0)).add(c2.mul(ca * cb))); }
    const all = new Map();
    for (const t of lin) all.set(t.e.join(), (all.get(t.e.join()) ?? q(0)).add(t.c));
    for (const [e, c] of sq) all.set(e, (all.get(e) ?? q(0)).add(c));
    const terms = [...all.entries()].map(([e, c]) => ({ c, e: e.split(',').map(Number) })).sort((A, B) => (A.e[0] + A.e[1]) - (B.e[0] + B.e[1]));
    return ML(`${c0.n ? qt(c0) : ''}${polyT(terms, XY).replace(/^(?=[^-])/, c0.n ? '+' : '')}`);
  })();
  return examMcq({
    skill: TY, level, key: `${TY}:mcq:${d.f}`, fallback: d.fallback,
    prompt: `Le polynôme de Taylor d'ordre 2 de f(x, y) = ${ML(d.f)} en (0, 0) est :`,
    right: P(k),
    wrongs: [
      { html: P({ ...k, XY: k.XY.mul(2) }), rule: 'a2_taylor_cross' },
      { html: P({ ...k, XX: k.XX.mul(2), XY: k.XY.mul(2), YY: k.YY.mul(2) }), rule: 'a2_taylor_no_half' },
      ...(full ? [{ html: full, rule: 'a2_taylor_no_truncate' }] : []),
      { html: P({ ...k, XY: k.XY.div(2) }), rule: 'a2_taylor_cross' },
    ],
    fillers: [{ html: P({ k0: k.k0, X: k.X, Y: k.Y }), rule: null }, { html: P({ ...k, XX: k.XX.neg() }), rule: null }],
    solution: [{ html: `u = ${ML(d.U)}, ${d.P.name} = ${ML(outerDL(d))} : p₂ = ${P(k)}.`, note: '' }],
  }, rng, opts);
}
function taylorCoef(level, rng, opts) {
  const d = taylorData(rng, { needXY: true, kinds: ['cos', 'exp', 'ln', 'inv'] });
  return coefLines({
    skill: TY, level, key: d.f, fallback: d.fallback,
    prompt: `Soit f(x, y) = ${ML(d.f)}. Que vaut ∂²f/∂x∂y(0, 0) ? (Lis-la sur le polynôme de Taylor d'ordre 2.)`,
    label: 'f_xy', value: qt(d.d.fxy), judge: { taylor: { fxy: qt(d.d.fxy) } },
    exam: examTag(opts, 1), subgoals: TY_SUB,
    solution: [{ html: `p₂ = ${ML(final(d))} : le coefficient de xy est f_xy(0, 0) = ${fq(d.d.fxy)}.`, note: '' }],
  });
}
const TY_TF = [
  { truth: true, key: 'grad', s: 'Si le polynôme de Taylor d\'ordre 2 de f ∈ C² en (0, 0) est p₂ = 2 + x² + 2y², alors ∇f(0, 0) = (0, 0).', why: 'Vrai : p₂ n\'a pas de terme de degré 1, donc f_x(0, 0) = f_y(0, 0) = 0 (2021 Q27).' },
  { truth: true, key: 'sin', s: 'Le polynôme de Taylor d\'ordre 2 de 4 sin x cos x en (0, 0) est 4x.', why: 'Vrai : 4 sin x cos x = 2 sin 2x = 4x + O(x³) : pas de terme de degré 2 (2019 Q19).' },
  { truth: false, key: 'min', s: 'Si (0, 0) est un point stationnaire de f ∈ C² et p₂ = 1 + x² − y², alors f a un minimum local en (0, 0).', why: 'Faux : x² − y² change de signe, (0, 0) est un point selle. Par exemple f = 1 + x² − y².' },
];
function taylorTf(rng, opts) {
  const t = rng.pick(TY_TF);
  const exam = examTag(opts) || { format: 'tf', points: 1 };
  return tfItem({
    skill: TY, level: 4, exam, key: t.key, truth: t.truth, statement: t.s, explanation: t.why,
    counter: t.truth ? null : a2Counter('p2NotMin', { p2: '1+x^2-y^2' }, [['f', 'f(x, y) =']], { f: '1+x^2-y^2' }),
  });
}

function taylorGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return taylorMcq(4, rng, opts);
  if (opts.exam === 'coef') return taylorCoef(4, rng, opts);
  if (opts.exam === 'tf') return taylorTf(rng, opts);
  if (level === 2) return derivItem(level, rng);
  if (level === 4 && rng.chance(0.5)) return derivItem(level, rng);
  return dlItem(level, rng, opts);
}
void Q; void vfMcq;

export const GEN = { [TY]: taylorGen };
