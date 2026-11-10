// Generators of module A2, part c (step U6): the chain rule (a2-chain),
// the gradient in polar coordinates (a2-chain-polar), the Laplacian of a
// radial function and in polar coordinates (a2-laplacian-radial).
// Catalogue: docs/universite/A2-analyse-2.md, « Différentiabilité ».
//
// Judges: mat for g(a), J_f(g(a)), J_g and the product (the traps read
// cfg.chain, and l_compose_order cfg.about.compose); value for one entry
// (coef) and for r, φ; system (unknowns a = f_x, b = f_y) for the chain
// rule at the point, inverted; equiv in r (and α, φ) for g′, g″ and Δf
// (the trap a2_laplacian_n reads cfg.lap); solset in α.

import { Q } from '../../math/rational.js';
import { parse } from '../../cas/parse.js';
import { JUDGES, readWith } from '../../judges/index.js';
import { evalFloat } from '../../cas/numeric.js';
import { ML as MLmat } from './alglin-kit.js';
import { readable } from './geo-kit.js';

const tidy = (t) => t.replace(/(^|; |= |\()− /g, '$1−');
import { joinSum, piText } from './analyse1-e-kit.js';
import {
  q, qt, fq, H, nz, ML, polyT, polyD, polyAt, ptT, vecT, rowT,
  partsItem, examMcq, vfMcq, tfItem, a2Counter, coefLines, examTag,
} from './analyse2-c-kit.js';

const UV = ['u', 'v'];
const isInt = (x) => Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9;
const valAt = (text, vars, p) => evalFloat(parse(text, { vars }), Object.fromEntries(vars.map((v, i) => [v, Number(p[i])])));
const allCells = (m, n) => { const out = []; for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) out.push([i, j]); return out; };

// ======================================================================
// a2-chain
// ======================================================================

const CH = 'a2-chain';
const CH_SUB = [
  { id: 'image', label: 'g(a)', skill: 'a2-partials' },
  { id: 'outer', label: 'J_f en g(a)', skill: 'a2-partials' },
  { id: 'inner', label: 'J_g(a)', skill: 'a2-partials' },
  { id: 'product', label: 'produit matriciel', skill: 'l-mat-product' },
];

// A component of g: 1 or 2 monomials in u, v (uv, u², v², u, v), maybe a constant.
function gComp(rng) {
  const monos = rng.shuffle([[1, 1], [2, 0], [0, 2], [1, 0], [0, 1]]).slice(0, rng.int(1, 2));
  const terms = monos.map((e) => ({ c: q(rng.pick([1, 1, -1, 2, -2])), e }));
  if (rng.chance(0.3)) terms.push({ c: q(nz(rng, -2, 2)), e: [0, 0] });
  return terms;
}
// f: polynomial terms in x, y, and maybe x·e^y or sin x (where they are 0 at a and g(a)).
function chainData(rng) {
  for (let t = 0; t < 200; t++) {
    const g = [gComp(rng), gComp(rng)];
    const a = [rng.int(-2, 2), rng.int(-2, 2)];
    const b = g.map((c) => polyAt(c, a));
    if (b.some((x) => Math.abs(x.n) > 4)) continue;
    const fTerms = [];
    const keys = new Set();
    for (let s = 0; fTerms.length < rng.int(2, 3) && s < 30; s++) {
      const i = rng.int(0, 2);
      const j = rng.int(0, 2 - i + (i === 0 ? 1 : 0));
      if (i + j === 0 || i + j > 3 || keys.has(`${i},${j}`)) continue;
      keys.add(`${i},${j}`);
      fTerms.push({ c: q(nz(rng, -3, 3)), e: [i, j] });
    }
    const special = [];
    if (b[1].n === 0 && a[1] === 0 && rng.chance(0.6)) special.push({ f: 'xe^y', dx: 'e^y', dy: 'xe^y' });
    else if (b[0].n === 0 && a[0] === 0 && rng.chance(0.6)) special.push({ f: 'sin(x)', dx: 'cos(x)', dy: '0' });
    const XY = ['x', 'y'];
    const P = joinSum([polyT(polyD(fTerms, 0), XY), ...special.map((s) => s.dx)]);
    const Qd = joinSum([polyT(polyD(fTerms, 1), XY), ...special.map((s) => s.dy)]);
    if (P === '0' || Qd === '0') continue;
    const Jfb = [P, Qd].map((tx) => valAt(tx, XY, b));
    const Jfa = [P, Qd].map((tx) => valAt(tx, XY, a));
    if (![...Jfb, ...Jfa].every((x) => isInt(x) && Math.abs(x) <= 30)) continue;
    if (Jfb.every((x, i) => Math.round(x) === Math.round(Jfa[i]))) continue;
    const Jgs = g.map((c) => [polyT(polyD(c, 0), UV), polyT(polyD(c, 1), UV)]);
    const Jg = g.map((c) => [polyAt(polyD(c, 0), a), polyAt(polyD(c, 1), a)]);
    if (Jg.flat().filter((x) => x.n !== 0).length < 3) continue;
    const fb = Jfb.map((x) => q(Math.round(x)));
    const fa = Jfa.map((x) => q(Math.round(x)));
    const Jh = [0, 1].map((j) => fb[0].mul(Jg[0][j]).add(fb[1].mul(Jg[1][j])));
    const JhA = [0, 1].map((j) => fa[0].mul(Jg[0][j]).add(fa[1].mul(Jg[1][j])));
    if (Jh.some((x) => Math.abs(x.n) > 40) || Jh.every((x) => x.n === 0)) continue;
    return { g, a, b, P, Q: Qd, fb, fa, Jgs, Jg, Jh, JhA, f: joinSum([polyT(fTerms, XY), ...special.map((s) => s.f)]) };
  }
  // Fallback: g = (u + v, u − v), f = x² + y² at (1, 1).
  const g = [[{ c: q(1), e: [1, 0] }, { c: q(1), e: [0, 1] }], [{ c: q(1), e: [1, 0] }, { c: q(-1), e: [0, 1] }]];
  return { g, a: [1, 1], b: [q(2), q(0)], P: '2x', Q: '2y', fb: [q(4), q(0)], fa: [q(2), q(2)], Jgs: [['1', '1'], ['1', '-1']], Jg: [[q(1), q(1)], [q(1), q(-1)]], Jh: [q(4), q(4)], JhA: [q(4), q(0)], f: 'x^2+y^2', fallback: true };
}
const gML = (d) => `g(u, v) = (${d.g.map((c) => ML(polyT(c, UV))).join(', ')})`;
const jfML = (d) => `J_f(x, y) = (${ML(d.P)}, ${ML(d.Q)})`;
// The entry j of the traps' values: J_f(a)·J_g(a), one term kept, J_g·J_fᵀ.
function chainWrongs(d, j) {
  const { fb, fa, Jg } = d;
  return {
    atA: d.JhA[j],
    noInner: fb[j].mul(Jg[j][j]),
    order: Jg[j][0].mul(fb[0]).add(Jg[j][1].mul(fb[1])),
  };
}
function chainCfg(d) {
  const j = 1;
  void j;
  return {
    outerAtA: rowT([d.fa]), productAtA: rowT([d.JhA]),
    productNoInner: rowT([[0, 1].map((k) => d.fb[k].mul(d.Jg[k][k]))]),
    ga: ptT(d.b), a: ptT(d.a),
  };
}

function chainItem(level, rng, opts = {}) {
  const d = chainData(rng);
  const guided = level <= 2;
  const ch = chainCfg(d);
  const JgSym = `[${d.Jgs.map((r) => `[${r.join(',')}]`).join(',')}]`;
  const JgNum = rowT(d.Jg);
  const outer = rowT([d.fb]);
  const prod = rowT([d.Jh]);
  const pointDec = {
    kind: 'decision', prompt: 'En quel point évaluer J_f ?', levels: [3], options: [
      { id: 'ga', label: `En g(a) = ${ptT(d.b)}`, valid: true, ref: true },
      { id: 'a', label: `En a = ${ptT(d.a)}`, valid: false, rule: 'a2_chain_wrong_point', why: `f reçoit g(a) = ${ptT(d.b)}, pas a.` },
    ],
  };
  const orderDec = {
    kind: 'decision', prompt: 'Dans quel ordre multiplier ?', levels: [3], options: [
      { id: 'fg', label: 'J_f(g(a))·J_g(a)', valid: true, ref: true },
      { id: 'gf', label: 'J_g(a)·J_f(g(a))', valid: false, rule: 'l_compose_order', why: 'g est appliquée en premier : sa jacobienne est à droite. Ici J_g·J_f (2 × 2 fois 1 × 2) n\'a même pas de sens.' },
    ],
  };
  const menuOf = (valid) => [
    { id: 'image', label: 'Calculer le point image g(a)', valid: valid === 'image' },
    { id: 'outer', label: 'Évaluer J_f au point g(a)', valid: valid === 'outer' },
    { id: 'outer-a', label: 'Évaluer J_f au point a', valid: false, rule: 'a2_chain_wrong_point', why: 'f reçoit g(a), pas a.' },
    { id: 'inner', label: 'Calculer J_g, puis l\'évaluer en a', valid: valid === 'inner' },
    { id: 'product', label: 'Multiplier J_f(g(a))·J_g(a)', valid: valid === 'product' },
  ];
  const parts = [
    { start: 'g', judge: { kind: 'mat', expect: vecT(d.b) }, notes: level === 1 ? ['Étape 1 : le point image g(a).'] : [], menu: menuOf('image'),
      lines: [{ math: vecT(d.b), note: `g${ptT(d.a)}`, subgoal: 'image', cells: level === 1 ? [[0, 0], [1, 0]] : undefined }] },
    { html: level === 1 ? 'Étape 2 : J_f là-bas, au point g(a).' : 'La jacobienne de f au point g(a) :', ask: `J_f${ptT(d.b)} =`, start: 'J_f', judge: { kind: 'mat', expect: outer, chain: ch }, decisions: [pointDec], menu: menuOf('outer'),
      lines: [{ math: outer, note: `On remplace (x, y) par g(a) = ${ptT(d.b)}`, subgoal: 'outer', cells: level === 1 ? [[0, 0], [0, 1]] : undefined }] },
    { html: level === 1 ? 'Étape 3 : J_g ici, d\'abord en (u, v)…' : 'La jacobienne de g :', ask: 'J_g(u, v) =', start: 'J_g', judge: { kind: 'mat', vars: UV, expect: JgSym }, menu: menuOf('inner'),
      lines: [{ math: JgSym, note: 'Une ligne par composante de g', subgoal: 'inner', cells: level === 1 ? allCells(2, 2) : undefined }] },
    { html: '… puis au point a :', ask: `J_g${ptT(d.a)} =`, start: 'J_g', judge: { kind: 'mat', expect: JgNum }, menu: menuOf('inner'),
      lines: [{ math: JgNum, note: '', subgoal: 'inner', cells: level === 1 ? allCells(2, 2) : undefined }] },
    { html: 'Le produit J_h(a) = J_f(g(a))·J_g(a) :', ask: `J_h${ptT(d.a)} =`, start: 'J_h', judge: { kind: 'mat', expect: prod, chain: ch }, decisions: [orderDec], menu: menuOf('product'),
      lines: [
        { math: `${outer}·${JgNum}`, note: 'J_f(g(a)) à gauche, J_g(a) à droite', subgoal: 'product' },
        { math: prod, note: 'Ligne fois colonnes', subgoal: 'product', cells: guided ? [[0, 0], [0, 1]] : undefined },
      ] },
  ];
  return partsItem({
    skill: CH, level, parts, subgoals: CH_SUB, key: `${CH}:${d.f}:${d.g.map((c) => polyT(c, UV)).join('|')}:${d.a}`, fallback: d.fallback,
    prompt: `Soit ${gML(d)} et f : ℝ² → ℝ différentiable, de jacobienne ${jfML(d)}. On pose h = f ∘ g. Calcule J_h${ptT(d.a)}.`,
    hints: H('J_h(a) = J_f(g(a))·J_g(a) : commence par calculer g(a).', `J_f${ptT(d.b)} = ${MLmat(outer)}`, `J_h${ptT(d.a)} = ${MLmat(outer)}·${MLmat(JgNum)} = ${MLmat(prod)}`),
  });
}

const VAR_NAMES = ['u', 'v'];
function chainAsk(d, rng) {
  const j = d.Jh[1].n !== 0 || d.Jh[0].n === 0 ? 1 : 0;
  void rng;
  return { j, name: `∂h/∂${VAR_NAMES[j]}${ptT(d.a)}`, w: chainWrongs(d, j) };
}
function chainMcq(level, rng, opts) {
  const d = chainData(rng);
  const { j, name, w } = chainAsk(d, rng);
  const right = d.Jh[j];
  const opt = (x) => ML(qt(x));
  return examMcq({
    skill: CH, level, key: `${CH}:mcq:${d.f}:${d.g.map((c) => polyT(c, UV)).join('|')}:${d.a}`, fallback: d.fallback,
    prompt: `Soit ${gML(d)} et f : ℝ² → ℝ différentiable, de jacobienne ${jfML(d)}. On pose h = f ∘ g. Alors ${name} vaut :`,
    right: opt(right),
    wrongs: [{ html: opt(w.atA), rule: 'a2_chain_wrong_point' }, { html: opt(w.noInner), rule: 'a2_chain_no_inner' }, { html: opt(w.order), rule: 'l_compose_order' }],
    fillers: [{ html: opt(right.neg()), rule: null }, { html: opt(right.add(1)), rule: null }, { html: opt(right.sub(2)), rule: null }],
    solution: [{ html: `g(a) = ${ptT(d.b)}, J_f(g(a)) = ${MLmat(rowT([d.fb]))}, J_g(a) = ${MLmat(rowT(d.Jg))} : J_h(a) = ${MLmat(rowT([d.Jh]))}.`, note: '' }],
  }, rng, opts);
}
function chainCoef(level, rng, opts) {
  const d = chainData(rng);
  const { j, name, w } = chainAsk(d, rng);
  return coefLines({
    skill: CH, level, key: `${d.f}:${d.g.map((c) => polyT(c, UV)).join('|')}:${d.a}:${j}`, fallback: d.fallback,
    prompt: `Soit ${gML(d)} et f : ℝ² → ℝ différentiable, de jacobienne ${jfML(d)}. On pose h = f ∘ g. Calcule ${name}.`,
    label: `h_${VAR_NAMES[j]}`, value: qt(d.Jh[j]),
    judge: { chain: { coefAtA: qt(w.atA), coefNoInner: qt(w.noInner), ga: ptT(d.b), a: ptT(d.a) } },
    exam: examTag(opts, 1), subgoals: CH_SUB,
    solution: [{ html: `${name} = ∂f/∂x(g(a))·∂g₁/∂${VAR_NAMES[j]}(a) + ∂f/∂y(g(a))·∂g₂/∂${VAR_NAMES[j]}(a) = ${fq(d.Jh[j])}`, note: '' }],
  });
}
const CH_TF = [
  { truth: false, key: 'order', s: 'Pour g : ℝ² → ℝ² et f : ℝ² → ℝ différentiables, J_{f∘g}(a) = J_g(a)·J_f(g(a)).', why: 'Faux : J_{f∘g}(a) = J_f(g(a))·J_g(a). Ici J_g(a)·J_f(g(a)) (2 × 2 fois 1 × 2) n\'a même pas de sens.', ruleIfTrue: 'l_compose_order' },
  { truth: true, key: 'curve', s: 'Si f : ℝ² → ℝ est différentiable et γ : ℝ → ℝ² dérivable, alors (f∘γ)′(t) = ∇f(γ(t))·γ′(t).', why: 'Vrai : c\'est la règle de chaîne pour une courbe (une jacobienne 1 × 2 fois une 2 × 1).' },
  { truth: false, key: 'point', s: 'Pour h = f∘g, on a J_h(a) = J_f(a)·J_g(a).', why: 'Faux : f reçoit g(a), il faut J_f(g(a)).', ruleIfTrue: 'a2_chain_wrong_point' },
];
function chainGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return chainMcq(4, rng, opts);
  if (opts.exam === 'coef') return chainCoef(4, rng, opts);
  if (opts.exam === 'tf') { const t = rng.pick(CH_TF); return vfMcq(CH, t.s, t.truth, rng, { key: t.key, why: t.why, ruleIfTrue: t.ruleIfTrue }); }
  if (level === 5) return chainMcq(5, rng, opts);
  return chainItem(level, rng, opts);
}

// ======================================================================
// a2-chain-polar
// ======================================================================

const CP = 'a2-chain-polar';
const CP_SUB = [
  { id: 'coords', label: 'r et φ', skill: 'g3-identities' },
  { id: 'chain', label: 'règle de chaîne en polaires', skill: CH },
  { id: 'solve', label: 'système 2 × 2', skill: 'eq-systems' },
];

// Numbers a + b√s (s = 1, 2 or 3 for the whole item).
class F {
  constructor(a, b = 0, s = 1) { this.a = q(a); this.b = q(b); this.s = s; }
  add(o) { o = F.of(o, this.s); return new F(this.a.add(o.a), this.b.add(o.b), this.s); }
  sub(o) { o = F.of(o, this.s); return new F(this.a.sub(o.a), this.b.sub(o.b), this.s); }
  mul(o) { o = F.of(o, this.s); return new F(this.a.mul(o.a).add(this.b.mul(o.b).mul(this.s)), this.a.mul(o.b).add(this.b.mul(o.a)), this.s); }
  div(k) { return new F(this.a.div(q(k)), this.b.div(q(k)), this.s); }
  neg() { return new F(this.a.neg(), this.b.neg(), this.s); }
  isZero() { return this.a.n === 0 && this.b.n === 0; }
  eq(o) { return this.sub(o).isZero(); }
  static of(x, s) { return x instanceof F ? x : new F(x, 0, s); }
  // CAS text: 3, -1/2, √3, 2√3, -√3/2, 1+√3, (1-√3)/2.
  text() {
    const r = (b) => {
      const B = b.n < 0 ? b.neg() : b;
      const top = B.n === 1 ? `√${this.s}` : `${B.n}√${this.s}`;
      return { neg: b.n < 0, t: B.d === 1 ? top : `${top}/${B.d}` };
    };
    if (this.b.n === 0 || this.s === 1) return qt(this.s === 1 ? this.a.add(this.b) : this.a);
    const R = r(this.b);
    if (this.a.n === 0) return `${R.neg ? '-' : ''}${R.t}`;
    return `${qt(this.a)}${R.neg ? '-' : '+'}${R.t}`;
  }
  show() { return this.text().replace(/(.)([+-])/g, '$1 $2 ').replace(/-/g, '−'); }
  value() { return this.a.valueOf() + this.b.valueOf() * Math.sqrt(this.s); }
}
// cos and sin of an angle in degrees (multiples of 30° and 45°).
function trig(deg, s) {
  const d = ((deg % 360) + 360) % 360;
  const T = {
    0: [new F(1, 0, s), new F(0, 0, s)], 30: [new F(0, q(1, 2), 3), new F(q(1, 2), 0, 3)], 45: [new F(0, q(1, 2), 2), new F(0, q(1, 2), 2)],
    60: [new F(q(1, 2), 0, 3), new F(0, q(1, 2), 3)], 90: [new F(0, 0, s), new F(1, 0, s)], 120: [new F(q(-1, 2), 0, 3), new F(0, q(1, 2), 3)],
    180: [new F(-1, 0, s), new F(0, 0, s)], 270: [new F(0, 0, s), new F(-1, 0, s)],
  }[d];
  return T.map((x) => new F(x.a, x.b, s));
}
const PHIS = [{ deg: 0, s: 1 }, { deg: 30, s: 3 }, { deg: 45, s: 2 }, { deg: 60, s: 3 }, { deg: 90, s: 1 }, { deg: 180, s: 1 }];
// r^k as a factor text: '', 'r', 'r^2'.
const rk = (k) => (k === 0 ? '' : k === 1 ? 'r' : `r^${k}`);
const cT = (c, body) => (body ? (c === 1 ? body : c === -1 ? `-${body}` : `${c}${body}`) : String(c));
function polarData(rng) {
  for (let t = 0; t < 200; t++) {
    const m = rng.int(1, 3);
    const p = rng.int(1, 3);
    const k = rng.pick([1, 2]);
    const T = rng.pick(['cos', 'sin']);
    const r0 = rng.pick([1, 2, 2]);
    const ph = rng.pick(PHIS);
    if (k === 2 && ph.deg === 45 && rng.chance(0.5)) continue;
    const s = ph.deg === 45 && k === 1 ? 2 : ph.s;
    const kphi = k === 1 ? 'φ' : '2φ';
    // J of f̃ = r^m T(kφ) + r^p.
    const trigT = (fn) => `${fn}(${kphi})`;
    const withR = (e, fn) => (rk(e) ? `${rk(e)}×${trigT(fn)}` : trigT(fn));
    const fr = joinSum([cT(m, withR(m - 1, T)), cT(p, rk(p - 1))]);
    const fp = cT(T === 'cos' ? -k : k, withR(m, T === 'cos' ? 'sin' : 'cos'));
    const [ck, sk] = trig(k * ph.deg, s);
    const [c, sn] = trig(ph.deg, s);
    const Tv = T === 'cos' ? ck : sk;
    const dTv = T === 'cos' ? sk.neg() : ck;
    const R = Tv.mul(m * r0 ** (m - 1)).add(p * r0 ** (p - 1));
    const P = dTv.mul(k * r0 ** m);
    const fx = c.mul(R).sub(sn.mul(P).div(r0));
    const fy = sn.mul(R).add(c.mul(P).div(r0));
    const x0 = c.mul(r0);
    const y0 = sn.mul(r0);
    if (fx.isZero() && fy.isZero()) continue;
    return { m, p, k, T, r0, deg: ph.deg, s, fr, fp, R, P, fx, fy, c, sn, x0, y0, F: `${rk(m)}${T}(${kphi})+${rk(p)}` };
  }
  // Fallback: 2019 Q16, J_f̃ = (3r²cos φ + 2r, −r³ sin φ) at (0, 2).
  const s = 1;
  return { m: 3, p: 2, k: 1, T: 'cos', r0: 2, deg: 90, s, fr: '3r^2cos(φ)+2r', fp: '-r^3sin(φ)', R: new F(4, 0, s), P: new F(-8, 0, s), fx: new F(4, 0, s), fy: new F(4, 0, s), c: new F(0, 0, s), sn: new F(1, 0, s), x0: new F(0, 0, s), y0: new F(2, 0, s), F: 'r^3cos(φ)+r^2', fallback: true };
}
const polarPt = (d) => `(${d.x0.show()} ; ${d.y0.show()})`;
const coefA = (c, v) => { const t = c.text(); if (c.isZero()) return ''; if (t === '1') return v; if (t === '-1') return `-${v}`; return /^-?\d+$/.test(t) || /^-?√\d$/.test(t) || /^-?\d+√\d$/.test(t) ? `${t}${v}` : `(${t})${v}`; };
const sumA = (ts) => ts.filter(Boolean).reduce((acc, t) => (acc ? (t.startsWith('-') ? acc + t : `${acc}+${t}`) : t), '');
// The system is already solved (a = … ; b = …) when φ = 0 and r = 1.
const solved = (d) => d.r0 === 1 && d.deg === 0;
function polarSystem(d) {
  const r = d.r0;
  const e1 = `${sumA([coefA(d.c, 'a'), coefA(d.sn, 'b')])} = ${d.R.text()}`;
  const e2 = `${sumA([coefA(d.sn.mul(-r), 'a'), coefA(d.c.mul(r), 'b')])} = ${d.P.text()}`;
  return `${e1} ; ${e2}`;
}
const IDENTITIES = [
  { id: 'ok', t: 'f̃_r² + f̃_φ²/r²', valid: true },
  { id: 'one', t: 'f̃_r² + f̃_φ²', rule: 'a2_polar_grad_factor' },
  { id: 'r2', t: 'f̃_r² + r²·f̃_φ²', rule: 'a2_polar_grad_factor' },
  { id: 'rr', t: 'f̃_r²/r² + f̃_φ²', rule: null },
];
const WHY_ID = 'f̃_φ = r(−sin φ·f_x + cos φ·f_y) contient un facteur r : f_x² + f_y² = f̃_r² + f̃_φ²/r².';

function polarItem(level, rng, opts = {}) {
  const d = polarData(rng);
  const pt = polarPt(d);
  const sys = polarSystem(d);
  const fin = `(${d.fx.text()} ; ${d.fy.text()})`;
  const phiT = piText(new Q(d.deg, 180));
  const idDec = {
    kind: 'decision', prompt: 'Laquelle de ces identités est juste ? f_x² + f_y² =', levels: [3],
    options: IDENTITIES.map((o) => ({ id: o.id, label: o.t, valid: !!o.valid, ...(o.valid ? { ref: true } : { why: WHY_ID }), ...(o.rule ? { rule: o.rule } : {}) })),
  };
  const sysNote = `f̃_r = cos φ·a + sin φ·b et f̃_φ = −r sin φ·a + r cos φ·b, avec a = ∂f/∂x${pt}, b = ∂f/∂y${pt}, et J_f̃(${d.r0}, ${phiT.replace(/-/g, '−')}) = (${d.R.show()}, ${d.P.show()}).`;
  const parts = [
    { start: 'r', judge: { kind: 'value', expect: String(d.r0) }, menu: [{ id: 'r', label: 'r = √(x² + y²)', valid: true }, { id: 'phi', label: 'φ = arctan(y/x)', valid: false, why: 'Commence par r = √(x² + y²).' }],
      lines: [{ math: String(d.r0), note: 'r = √(x² + y²)', subgoal: 'coords', blank: level === 1 ? [String(d.r0)] : [] }] },
    { html: 'L\'angle polaire du point :', ask: 'φ =', start: 'φ', judge: { kind: 'value', expect: phiT, form: 'exact' }, menu: [{ id: 'phi', label: 'cos φ = x/r et sin φ = y/r', valid: true }],
      lines: [{ math: phiT, note: 'cos φ = x/r, sin φ = y/r', subgoal: 'coords' }] },
    { html: 'La règle de chaîne au point, puis le système à résoudre (a = ∂f/∂x, b = ∂f/∂y au point) :', ask: '', start: 'a = f_x ; b = f_y', judge: { kind: 'system', vars: ['a', 'b'], solutions: [[d.fx.text(), d.fy.text()]] },
      decisions: [idDec], notes: level <= 2 ? [sysNote] : [],
      menu: [
        { id: 'chain', label: 'f̃_r = cos φ·f_x + sin φ·f_y ; f̃_φ = −r sin φ·f_x + r cos φ·f_y', valid: true },
        { id: 'chain-r', label: 'f̃_r = cos φ·f_x + sin φ·f_y ; f̃_φ = −sin φ·f_x + cos φ·f_y', valid: false, rule: 'a2_polar_grad_factor', why: 'Dériver r cos φ par rapport à φ donne −r sin φ : le facteur r reste.' },
        { id: 'solve', label: 'Résoudre le système 2 × 2', valid: true },
      ],
      lines: [
        { math: sys, note: `En (r, φ) = (${d.r0}, ${phiT.replace(/-/g, '−')})`, subgoal: 'chain' },
        ...(solved(d) ? [] : [{ math: fin, note: '(∂f/∂x ; ∂f/∂y) au point', subgoal: 'solve' }]),
      ] },
  ];
  return partsItem({
    skill: CP, level, parts, subgoals: CP_SUB, key: `${CP}:${d.F}:${d.r0}:${d.deg}`, fallback: d.fallback,
    prompt: `Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (${ML(d.fr)}, ${ML(d.fp)}). Calcule ∇f${pt}.`,
    hints: H('Écris le point en polaires, puis f̃_r = cos φ·f_x + sin φ·f_y et f̃_φ = −r sin φ·f_x + r cos φ·f_y ; résous pour f_x et f_y.', `En φ = ${phiT.replace(/-/g, '−')} : cos φ = ${d.c.show()}, sin φ = ${d.sn.show()} ; f̃_r = ${d.R.show()}, f̃_φ = ${d.P.show()}`, tidy(readable(sys))),
  });
}

function polarMcq(level, rng, opts) {
  if (opts.exam && rng.chance(0.4)) {
    const [ok, ...bad] = IDENTITIES;
    return examMcq({
      skill: CP, level, key: `${CP}:mcq:identity`,
      prompt: 'Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ), r > 0. Alors f_x² + f_y² vaut :',
      right: ok.t, wrongs: bad.map((o) => ({ html: o.t, rule: o.rule })),
      solution: [{ html: WHY_ID, note: '' }],
    }, rng, opts);
  }
  const d = polarData(rng);
  const pt = polarPt(d);
  const V = (x, y) => `(${x.show()} ; ${y.show()})`;
  const r = d.r0;
  return examMcq({
    skill: CP, level, key: `${CP}:mcq:${d.F}:${d.r0}:${d.deg}`, fallback: d.fallback,
    prompt: `Soit f : ℝ² → ℝ différentiable et f̃(r, φ) = f(r cos φ, r sin φ). On sait que J_f̃(r, φ) = (${ML(d.fr)}, ${ML(d.fp)}). Alors ∇f${pt} vaut :`,
    right: V(d.fx, d.fy),
    wrongs: [
      { html: V(d.c.mul(d.R).sub(d.sn.mul(d.P)), d.sn.mul(d.R).add(d.c.mul(d.P))), rule: 'a2_polar_grad_factor' },
      { html: V(d.sn.mul(d.R).sub(d.c.mul(d.P).div(r)), d.c.mul(d.R).add(d.sn.mul(d.P).div(r))), rule: 'a2_chain_wrong_point' },
    ],
    fillers: [
      { html: V(d.fy, d.fx), rule: null },
      { html: V(d.c.mul(d.R).add(d.sn.mul(d.P).div(r)), d.sn.mul(d.R).sub(d.c.mul(d.P).div(r))), rule: null },
      { html: V(d.fx.neg(), d.fy), rule: null },
    ],
    solution: [{ html: `r = ${r}, φ = ${piText(new Q(d.deg, 180)).replace(/-/g, '−')} ; ${tidy(readable(polarSystem(d)))} ; ∇f${pt} = ${V(d.fx, d.fy)}.`, note: '' }],
  }, rng, opts);
}
function polarTf(rng, opts) {
  const exam = examTag(opts) || { format: 'tf', points: 1 };
  const which = rng.int(0, 3);
  const pre = 'Soit f : ℝ² → ℝ de classe C¹ et f̃(r, φ) = f(r cos φ, r sin φ), r > 0. Pour tout (r, φ) : ';
  if (which === 0) return tfItem({ skill: CP, level: 4, exam, key: 'id', truth: true, statement: `${pre}f_x² + f_y² = f̃_r² + f̃_φ²/r².`, explanation: WHY_ID });
  if (which === 1) return tfItem({ skill: CP, level: 4, exam, key: 'fr', truth: true, statement: `${pre}f̃_r = cos φ·f_x + sin φ·f_y (dérivées de f prises en (r cos φ, r sin φ)).`, explanation: 'Vrai : règle de chaîne, ∂(r cos φ)/∂r = cos φ et ∂(r sin φ)/∂r = sin φ.' });
  const factor = which === 2 ? '1' : 'r^2';
  return tfItem({
    skill: CP, level: 4, exam, key: `false-${factor}`, truth: false, ruleIfTrue: 'a2_polar_grad_factor',
    statement: `${pre}f_x² + f_y² = f̃_r² + ${factor === '1' ? '' : 'r²·'}f̃_φ².`,
    explanation: `Faux : ${WHY_ID} Avec f = x : f̃ = r cos φ, en r = 2, φ = π/2 : f_x² + f_y² = 1, mais f̃_r² + ${factor === '1' ? '' : 'r²·'}f̃_φ² = ${factor === '1' ? 4 : 64}.`,
    counter: a2Counter('polarGradIdentity', { factor }, [['f', 'f(x, y) =']], { f: 'x' }),
  });
}
function polarGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return polarMcq(4, rng, opts);
  if (opts.exam === 'tf') return polarTf(rng, opts);
  if (level === 5) return polarMcq(5, rng, opts);
  return polarItem(level, rng, opts);
}

// ======================================================================
// a2-laplacian-radial
// ======================================================================

const LR = 'a2-laplacian-radial';
const LR_SUB = [
  { id: 'formula', label: 'formule du laplacien radial', skill: LR },
  { id: 'derivs', label: 'g′ et g″', skill: 'g6-deriv-rules' },
  { id: 'combine', label: 'simplifier', skill: 'rat-simplify' },
];
const RV = ['r', 'α'];
const eqR = (extra = {}) => ({ kind: 'equiv', vars: ['r'], domain: { r: [0.2, 3] }, target: 'no-prime', ...extra });
// c·r^k as text: 3r^2, -r, 2/r, -1/r^3, 5.
function rPow(c, k) {
  const C = q(c);
  if (C.n === 0) return '0';
  if (k === 0) return qt(C);
  const sign = C.n < 0 ? '-' : '';
  const A = C.n < 0 ? C.neg() : C;
  if (k > 0) {
    const body = k === 1 ? 'r' : `r^${k}`;
    return `${sign}${A.eq(1) ? '' : A.d === 1 ? qt(A) : `(${qt(A)})`}${body}`;
  }
  const den = k === -1 ? 'r' : `r^${-k}`;
  return A.d === 1 ? `${sign}${qt(A)}/${den}` : `${sign}${A.n}/(${A.d}${den})`;
}
// g with g′, g″, and Δf in dimension n (k = the coefficient of g′/r, n − 1 when right).
function radialG(rng) {
  const kind = rng.pick(['pow', 'pow', 'pow', 'ln', 'gauss']);
  if (kind === 'pow') {
    const a = rng.pick([-2, -1, 2, 3, 4]);
    return {
      kind, a, g: rPow(1, a), d1: rPow(a, a - 1), d2: rPow(a * (a - 1), a - 2),
      lap: (k) => rPow(a * (a - 1 + k), a - 2),
      shown: a === -1 ? '1/r' : `r^${a}`,
    };
  }
  if (kind === 'ln') return { kind, g: 'ln(r)', d1: '1/r', d2: '-1/r^2', lap: (k) => rPow(k - 1, -2), shown: 'ln r' };
  return { kind, g: 'e^(-r^2)', d1: '-2re^(-r^2)', d2: '(4r^2-2)e^(-r^2)', lap: (k) => (k === -1 ? '' : `(4r^2-${2 + 2 * k})e^(-r^2)`), shown: 'e^(−r²)' };
}
// What f is, in cartesian coordinates, for the prompt.
function cartOf(G, n) {
  const R2 = n === 2 ? 'x^2+y^2' : 'x^2+y^2+z^2';
  if (G.kind === 'ln') return `ln(√(${R2}))`;
  if (G.kind === 'gauss') return `e^(-(${R2}))`;
  if (G.a === 2) return R2;
  if (G.a === -2) return `1/(${R2})`;
  if (G.a === -1) return `1/√(${R2})`;
  if (G.a % 2 === 0) return `(${R2})^${G.a / 2}`;
  return G.a > 0 ? `(${R2})^(${G.a}/2)` : `1/(${R2})^(${-G.a}/2)`;
}
const formulaT = (k) => (k === 0 ? 'g″' : `g″ + (${k}/r)·g′`);

function radialItem(level, rng) {
  const G = radialG(rng);
  const n = rng.pick([2, 3]);
  const k = n - 1;
  const lapStart = `d(d(${G.g},r),r)+(${k}/r)×d(${G.g},r)`;
  const subst = `${G.d2.includes('e^') ? G.d2 : `(${G.d2})`}+(${k}/r)×(${G.d1})`;
  const lapJ = eqR({ lap: { n, g: G.g }, target: 'short', goal: G.lap(k), slack: 4 });
  const dec = {
    kind: 'decision', prompt: `f ne dépend que de r = ‖x‖ dans ℝ${n === 2 ? '²' : '³'}. Quelle formule ?`, levels: [2, 3],
    options: [...new Set([k, 1, n, n - 2])].filter((x) => x >= 0).map((x) => ({
      id: `k${x}`, label: `Δf = ${formulaT(x)}`, valid: x === k, ...(x === k ? { ref: true } : { rule: 'a2_laplacian_n', why: `En dimension ${n}, le coefficient de g′/r est n − 1 = ${k}.` }),
    })),
  };
  const parts = [
    { start: `d(${G.g},r)`, judge: eqR(), decisions: [dec], notes: level === 1 ? [`Δf = g″ + ((n − 1)/r)·g′, ici n − 1 = ${k}.`] : [],
      menu: [{ id: 'd1', label: 'Dériver g', valid: true }],
      lines: [{ math: G.d1, note: 'g′(r)', subgoal: 'derivs', blank: level === 1 ? [G.d1] : [] }] },
    { html: 'Puis g″ :', ask: 'g″(r) =', start: `d(${G.d1},r)`, judge: eqR(), menu: [{ id: 'd2', label: 'Dériver g′', valid: true }],
      lines: [{ math: G.d2, note: 'g″(r)', subgoal: 'derivs', blank: level === 1 ? [G.d2] : [] }] },
    { html: `Le laplacien en dimension ${n} :`, ask: 'Δf =', start: lapStart, judge: lapJ,
      menu: [{ id: 'subst', label: `Remplacer g′ et g″ dans g″ + (${k}/r)·g′`, valid: true }, { id: 'one', label: 'Remplacer dans g″ + g′/r', valid: k === 1, ...(k === 1 ? {} : { rule: 'a2_laplacian_n', why: `En dimension ${n}, le coefficient est ${k}.` }) }, { id: 'simp', label: 'Simplifier', valid: true }],
      lines: [
        ...(JUDGES.equiv.isFinal(lapJ, readWith(lapJ, subst)) === false ? [{ math: subst, note: `g″ + (${k}/r)·g′`, subgoal: 'formula' }] : []),
        { math: G.lap(k), note: 'Simplifié', subgoal: 'combine' },
      ] },
  ];
  return partsItem({
    skill: LR, level, parts, subgoals: LR_SUB, key: `${LR}:${G.g}:${n}`,
    prompt: `Dans ℝ${n === 2 ? '²' : '³'}, soit f = ${ML(cartOf(G, n))} = g(r) avec g(r) = ${ML(G.g)} et r = ‖x‖. Calcule g′, g″, puis Δf en fonction de r.`,
    hints: H(`f dépend seulement de r : utilise Δf = g″ + ((n − 1)/r)·g′.`, `Ici n − 1 = ${k} ; g′ = ${ML(G.d1)}`, `Δf = ${ML(subst)} = ${ML(G.lap(k))}`),
  });
}

// For which α is r^α harmonic? (levels 4 and 5)
function alphaItem(level, rng, n = rng.pick([2, 3])) {
  const k = n - 1;
  const start = `d(d(r^α,r),r)+(${k}/r)×d(r^α,r)`;
  const factor = n === 2 ? 'α^2' : `α(α+${n - 2})`;
  const eq = n === 2 ? 'α^2 = 0' : `α(α+${n - 2}) = 0`;
  const sol = n === 2 ? 'α = 0' : `α = 0 ou α = ${2 - n}`;
  const parts = [
    { start, judge: { kind: 'equiv', vars: RV, domain: { r: [0.3, 3], α: [-3, 3] }, target: 'short', goal: `${factor}r^(α-2)`, slack: 4, lap: { n, g: 'r^α' } },
      menu: [{ id: 'subst', label: `g′ = αr^(α−1), g″ = α(α − 1)r^(α−2), dans g″ + (${k}/r)·g′`, valid: true }, { id: 'fact', label: 'Mettre r^(α−2) en facteur', valid: true }],
      lines: [
        { math: `α(α-1)r^(α-2)+${k === 1 ? '' : k}αr^(α-2)`, note: `g″ + (${k}/r)·g′`, subgoal: 'formula' },
        { math: `${factor}r^(α-2)`, note: 'r^(α−2) en facteur', subgoal: 'combine' },
      ] },
    { html: 'Δf = 0 pour r > 0 :', ask: '', start: eq, judge: { kind: 'solset', v: 'α' }, menu: [{ id: 'solve', label: 'Résoudre en α (r^(α−2) ≠ 0)', valid: true }],
      lines: [{ math: sol, note: n === 2 ? 'Seule la constante r⁰ = 1 : en dimension 2, c\'est ln r qui est harmonique' : 'r⁰ = 1 et r⁻¹ = 1/r', subgoal: 'formula' }] },
  ];
  const R = n === 2 ? 'x² + y²' : 'x² + y² + z²';
  return partsItem({
    skill: LR, level, parts, subgoals: LR_SUB, key: `${LR}:alpha:${n}`,
    prompt: `Dans ℝ${n === 2 ? '²' : '³'} privé de 0, pour quelles valeurs de α la fonction f = (${R})^(α/2) = r^α vérifie-t-elle Δf = 0 ? Calcule d'abord Δf.`,
    hints: H('f = g(r) avec g = r^α : Δf = g″ + ((n − 1)/r)·g′.', `Δf = ${ML(`α(α-1)r^(α-2)+${k === 1 ? '' : k}αr^(α-2)`)}`, `Δf = ${ML(`${factor}r^(α-2)`)} = 0`),
  });
}

// Δ in polar coordinates of r^m cos(kφ) (level 4).
function polarLapItem(level, rng) {
  const m = rng.int(1, 3);
  const k = rng.int(1, 3);
  const F = `${rk(m)}cos(${k === 1 ? '' : k}φ)`;
  const cosT = `cos(${k === 1 ? '' : k}φ)`;
  const piece = (c) => { const p = rPow(c, m - 2); return p === '0' ? '' : p === '1' ? cosT : p === '-1' ? `-${cosT}` : `${p}×${cosT}`; };
  const subst = joinSum([piece(m * (m - 1)), piece(m), piece(-k * k)]);
  const fin = piece(m * m - k * k) || '0';
  const parts = [
    { start: `pd(${F},r,r)+(1/r)×pd(${F},r)+(1/r^2)×pd(${F},φ,φ)`, judge: { kind: 'equiv', vars: ['r', 'φ'], domain: { r: [0.3, 3], φ: [-3, 3] }, target: 'short', goal: fin, slack: 4 },
      menu: [{ id: 'd', label: 'Calculer f̃_rr, f̃_r et f̃_φφ', valid: true }, { id: 'simp', label: 'Simplifier', valid: true }],
      lines: [
        { math: subst, note: 'f̃_rr + f̃_r/r + f̃_φφ/r²', subgoal: 'formula' },
        ...(subst === fin ? [] : [{ math: fin, note: m === k ? `m = k : f est harmonique` : 'Simplifié', subgoal: 'combine' }]),
      ] },
  ];
  return partsItem({
    skill: LR, level, parts, subgoals: [...LR_SUB], key: `${LR}:polar:${F}`,
    prompt: `Soit f dont l'expression en polaires est f̃(r, φ) = ${ML(F)}. Calcule Δf avec Δf = f̃_rr + f̃_r/r + f̃_φφ/r².`,
    hints: H('Dérive deux fois en r, une fois en r, deux fois en φ, puis combine.', `f̃_rr = ${ML(joinSum([rPow(m * (m - 1), m - 2) === '0' ? '' : `${rPow(m * (m - 1), m - 2)}×${cosT}`]))}, f̃_φφ = ${ML(`${rPow(-k * k, m)}×${cosT}`)}`, `Δf = ${ML(fin)}`),
  });
}

function lapMcq(level, rng, opts) {
  const G = radialG(rng);
  const n = rng.pick([2, 3]);
  const k = n - 1;
  const ks = [...new Set([1, n, n - 2])].filter((x) => x !== k && x >= 0);
  return examMcq({
    skill: LR, level, key: `${LR}:mcq:${G.g}:${n}`,
    prompt: `Dans ℝ${n === 2 ? '²' : '³'}, soit f = ${ML(cartOf(G, n))}, c'est-à-dire f = g(r) avec g(r) = ${ML(G.g)}. Alors, pour r ≠ 0, Δf vaut :`,
    right: ML(G.lap(k)),
    wrongs: ks.map((x) => ({ html: ML(G.lap(x)), rule: 'a2_laplacian_n' })),
    fillers: [{ html: ML(G.d2), rule: null }, { html: ML(G.lap(k + 2)), rule: null }],
    solution: [{ html: `Δf = g″ + (${k}/r)·g′ = ${ML(G.d2)} + (${k}/r)·(${ML(G.d1)}) = ${ML(G.lap(k))}.`, note: '' }],
  }, rng, opts);
}
const LR_TF = [
  { truth: false, key: 'inv-r2', s: '1/r = 1/√(x² + y²) est harmonique sur ℝ² \\ {0}.', why: 'Faux : en dimension 2, Δ(1/r) = 2/r³ − 1/r³ = 1/r³ ≠ 0. C\'est ln r qui est harmonique dans ℝ² \\ {0}.', counter: { f: '1/√(x^2+y^2)', n: 2, ans: { x: '1', y: '0' } }, ruleIfTrue: 'a2_laplacian_n' },
  { truth: true, key: 'inv-r3', s: '1/r = 1/√(x² + y² + z²) est harmonique sur ℝ³ \\ {0}.', why: 'Vrai : g″ + (2/r)g′ = 2/r³ − 2/r³ = 0.' },
  { truth: true, key: 'ln', s: 'ln r = ln √(x² + y²) est harmonique sur ℝ² \\ {0}.', why: 'Vrai : g″ + g′/r = −1/r² + 1/r² = 0.' },
  { truth: false, key: 'r2', s: 'r² = x² + y² + z² est harmonique sur ℝ³.', why: 'Faux : Δ(x² + y² + z²) = 2 + 2 + 2 = 6.', counter: { f: 'x^2+y^2+z^2', n: 3, ans: { x: '1', y: '0', z: '0' } } },
];
function lapTf(rng, opts) {
  const t = rng.pick(LR_TF);
  const exam = examTag(opts) || { format: 'tf', points: 1 };
  const vars = t.counter?.n === 3 ? ['x', 'y', 'z'] : ['x', 'y'];
  return tfItem({
    skill: LR, level: 4, exam, key: t.key, truth: t.truth, statement: t.s, explanation: t.why, ruleIfTrue: t.ruleIfTrue || null,
    counter: t.counter ? a2Counter('notHarmonic', { f: t.counter.f, n: t.counter.n }, vars.map((v) => [v, `${v} =`]), t.counter.ans) : null,
  });
}
function lapGen(level, rng, profile, opts = {}) {
  if (opts.exam === 'mcq') return lapMcq(4, rng, opts);
  if (opts.exam === 'tf') return lapTf(rng, opts);
  if (level === 5) return rng.chance(0.5) ? alphaItem(5, rng, rng.pick([2, 3])) : radialItem(5, rng);
  if (level === 4) { const t = rng.int(0, 2); if (t === 1) return alphaItem(level, rng); if (t === 2) return polarLapItem(level, rng); }
  return radialItem(level, rng);
}

export const GEN = { [CH]: chainGen, [CP]: polarGen, [LR]: lapGen };
