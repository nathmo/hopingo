// c-contour-param, c-cauchy-thm, c-cauchy-formula (module C, part a, step U10).
//
// c-contour-param: ∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt on a segment p → q or a
// circle |z − z₀| = R; parts: γ (judge param, complex), γ′ (cvalue in t),
// f(γ(t))γ′(t) (cvalue in t, the value asked whatever the line: a line
// without γ′ names c_contour_dz_forgot), the integral (cvalue, ∫ computed
// numerically). Level 5: z̄ on two paths with the same ends.
// c-cauchy-thm: the singularities (complex set, or cfamily for cos z = 0),
// where they are with respect to Γ (decisions), then ∮ = 0; the lessons
// keep every singularity outside the closed disc (the other cases are
// multiple choice: level 5, exam).
// c-cauchy-formula: g, n identified (decision), g⁽ⁿ⁾(z) (cvalue with z a
// complex sample letter), then 2πi g⁽ⁿ⁾(z₀)/n!.

import { CQ, exactComplex } from '../../cas/complex.js';
import { parse } from '../../cas/parse.js';
import { residue } from '../../cas/series.js';
import {
  q, cq, M, rd, zt, piT, joinT, term, CV, CF, SETZ, KEYS, linesOf, choice, opt, H, examTag, problemItem, multiOf, pickK,
} from './cplx-a-kit.js';

const eq = (math, note, subgoal, blank) => ({ math, note, subgoal, blank });
const KEYS_T = ['calc', 'cplx', 'calcfn', 'anal', 'vecto'];
const fac = (n) => [1, 1, 2, 6, 24, 120][n];
// A complex constant as a factor: 2, (1+i), i, (−1).
const cf = (z) => { const t = zt(z); return /^\d+$/.test(t) || t === 'i' ? t : `(${t})`; };
// Σ c_k t^k with exact complex coefficients, as text.
const tPoly = (cs) => joinT(cs.map((c, k) => {
  if (c.isZero()) return '';
  const t = zt(c);
  if (k === 0) return t;
  const m = k === 1 ? 't' : `t^${k}`;
  return t === '1' ? m : t === '-1' ? `-${m}` : `${cf(c)}${m}`;
}));
// d·t: 2t, −2it, (1 − i)t.
const linT = (d) => (d.im.n === 0 ? term(d.re, 't') : d.re.n === 0 ? term(d.im, 'it') : `(${zt(d)})t`);
// A complex number as readable text: 1 + i, −2i.
const rdc = (t) => rd(t).replace(/(\S)([+−])/g, '$1 $2 ');
const iM = (t) => `<math><mrow>${t}</mrow></math>`;
const oint = (contour) => iM(`<msub><mo>∮</mo><mrow>${contour}</mrow></msub><mi>f</mi><mo>(</mo><mi>z</mi><mo>)</mo><mspace width="0.2em"/><mi>d</mi><mi>z</mi>`);
// MathML of |z − c| = R.
function circleML(c, R) {
  const inner = c === '0' ? '<mi>z</mi>' : `<mi>z</mi><mo>−</mo>${c.length > 1 ? `<mo>(</mo>${M(c).replace(/^<math[^>]*>|<\/math>$/g, '')}<mo>)</mo>` : M(c).replace(/^<math[^>]*>|<\/math>$/g, '')}`;
  return `<mo>|</mo>${inner}<mo>|</mo><mo>=</mo>${M(String(R)).replace(/^<math[^>]*>|<\/math>$/g, '')}`;
}
const circleT = (c, R) => `|z${c === '0' ? '' : ` − ${c.length > 1 ? `(${rd(c)})` : rd(c)}`}| = ${R}`;

// ======================================================================
// c-contour-param
// ======================================================================

const CP = 'c-contour-param';
const CP_SUB = [
  { id: 'param', label: 'paramétrer γ', skill: 'v-curve-param' },
  { id: 'deriv', label: 'γ′(t) et f(γ(t))', skill: CP },
  { id: 'value', label: 'calculer l\'intégrale', skill: CP },
];
const PTS = ['0', '1', 'i', '1+i', '2', '2i', '-1', '-i'];
const FN = {
  conj: { name: 'conj(z)', of: (g) => `conj(${g})`, holo: false },
  re: { name: 'Re(z)', of: (g) => `Re(${g})`, holo: false },
  im: { name: 'Im(z)', of: (g) => `Im(${g})`, holo: false },
  abs2: { name: '|z|^2', of: (g) => `|${g}|^2`, holo: false },
  sq: { name: 'z^2', of: (g) => `(${g})^2`, holo: true },
};
const P = (t) => parse(t, { complex: true });
const X = (t) => exactComplex(P(t), {});

// Segment p → q: {gamma, gp, fg (f(γ(t)) simplified), integrand, value}.
function segData(rng, fn) {
  for (let k = 0; k < 100; k++) {
    const [ps, qs] = pickK(rng, PTS, 2);
    const p = X(ps);
    const qq = X(qs);
    const d = qq.sub(p);
    if (d.isZero() || zt(d) === '1') continue;
    const gamma = joinT([p.isZero() ? '' : zt(p), linT(d)]);
    const gp = zt(d);
    let fg;
    let integrand;
    let value;
    if (fn === 'conj') {
      const pb = p.conj();
      const db = d.conj();
      fg = joinT([zt(pb) === '0' ? '' : zt(pb), `${cf(db)}t`]);
      const c0 = pb.mul(d);
      const c1 = db.mul(d);
      integrand = tPoly([c0, c1]);
      value = c0.add(c1.mul(new CQ(q(1, 2))));
    } else if (fn === 're' || fn === 'im') {
      const a = fn === 're' ? p.re : p.im;
      const b = fn === 're' ? d.re : d.im;
      if (b.n === 0 && a.n === 0) continue;
      fg = joinT([a.n ? String(a) : '', term(b, 't')]);
      integrand = tPoly([d.mul(new CQ(a)), d.mul(new CQ(b))]);
      value = d.mul(new CQ(a.add(b.div(2))));
    } else if (fn === 'abs2') {
      const c0 = p.abs2();
      const c1 = p.conj().mul(d).re.mul(2);
      const c2 = d.abs2();
      fg = joinT([c0.n ? String(c0) : '', term(c1, 't'), term(c2, 't^2')]);
      integrand = tPoly([d.mul(new CQ(c0)), d.mul(new CQ(c1)), d.mul(new CQ(c2))]);
      value = d.mul(new CQ(c0.add(c1.div(2)).add(c2.div(3))));
    } else {
      const c0 = p.mul(p);
      const c1 = p.mul(d).mul(new CQ(2));
      const c2 = d.mul(d);
      fg = joinT([c0.isZero() ? '' : zt(c0), c1.isZero() ? '' : `${cf(c1)}t`, `${cf(c2)}t^2`]);
      const e0 = c0.mul(d);
      const e1 = c1.mul(d);
      const e2 = c2.mul(d);
      integrand = tPoly([e0, e1, e2]);
      value = qq.mul(qq).mul(qq).sub(p.mul(p).mul(p)).mul(new CQ(q(1, 3)));
    }
    return {
      kind: 'seg', fn, ps, qs, gamma, gp, t: [0, 1], hi: '1', fg, integrand, value: zt(value),
      desc: `le segment de ${rdc(ps)} à ${rdc(qs)}`, line: `γ(t) = ${gamma}, t ∈ [0 ; 1]`, ref: gamma, key: `seg:${fn}:${ps}:${qs}`,
    };
  }
  return null;
}

// Circle |z − z₀| = R, positive sense.
function circData(rng, fn) {
  const z0s = fn === 'abs2' || fn === 'inv' ? '0' : rng.pick(['0', '0', '1', 'i', '-1']);
  const R = rng.pick([1, 2, 3]);
  const z0 = X(z0s);
  const gamma = z0s === '0' ? `${R === 1 ? '' : R}e^(it)` : `${z0s}+${R === 1 ? '' : R}e^(it)`;
  const gp = `${R === 1 ? '' : R}ie^(it)`;
  const R2 = R * R;
  let fg;
  let integrand;
  let value;
  if (fn === 'conj') {
    const zb = z0.conj();
    fg = joinT([z0.isZero() ? '' : zt(zb), `${R === 1 ? '' : R}e^(-it)`]);
    const c1 = zb.mul(new CQ(0, R));
    integrand = joinT([`${R2 === 1 ? '' : R2}i`, z0.isZero() ? '' : `${cf(c1)}e^(it)`]);
    value = `${2 * R2}πi`;
  } else if (fn === 're' || fn === 'im') {
    const a = fn === 're' ? z0.re : z0.im;
    const tr = fn === 're' ? 'cos(t)' : 'sin(t)';
    fg = joinT([a.n ? String(a) : '', term(R, tr)]);
    integrand = a.n ? `${R === 1 ? '' : R}i(${fg})e^(it)` : `${R2 === 1 ? '' : R2}i·${tr}e^(it)`;
    value = fn === 're' ? `${R2 === 1 ? '' : R2}πi` : `-${R2 === 1 ? '' : R2}π`;
  } else if (fn === 'abs2') {
    fg = String(R2);
    integrand = `${R2 * R}ie^(it)`;
    value = '0';
  } else if (fn === 'inv') {
    fg = `(1/${R === 1 ? '' : R})e^(-it)`.replace('(1/)', '');
    integrand = 'i';
    value = '2πi';
  } else {
    fg = `${R2 === 1 ? '' : R2}e^(2it)`;
    if (!z0.isZero()) {
      const zz = z0.mul(z0);
      const c1 = z0.mul(new CQ(2 * R));
      fg = joinT([zt(zz), `${cf(c1)}e^(it)`, `${R2 === 1 ? '' : R2}e^(2it)`]);
    }
    // (z₀ + Re^(it))²·iRe^(it) = iRz₀²e^(it) + 2iR²z₀e^(2it) + iR³e^(3it).
    const e1 = z0.mul(z0).mul(new CQ(0, R));
    const e2 = z0.mul(new CQ(0, 2 * R2));
    const ex = (c, k) => (c.isZero() ? '' : `${zt(c) === '1' ? '' : zt(c) === '-1' ? '-' : cf(c)}e^(${k === 1 ? '' : k}it)`);
    integrand = joinT([ex(e1, 1), ex(e2, 2), ex(new CQ(0, R2 * R), 3)]);
    value = '0';
  }
  return {
    kind: 'circ', fn, z0s, R, gamma, gp, t: [0, '2π'], hi: '2π', fg, integrand, value,
    desc: `le cercle ${circleT(z0s, R)}, parcouru une fois dans le sens positif`, line: `γ(t) = ${gamma}, t ∈ [0 ; 2π]`, ref: gamma, key: `circ:${fn}:${z0s}:${R}`,
  };
}

const CP_MENU = (right) => [
  { id: 'param', label: 'Segment : γ(t) = p + (q − p)t ; cercle : γ(t) = z₀ + Re^(it)' },
  { id: 'deriv', label: 'Dériver γ par rapport à t' },
  { id: 'subst', label: 'Remplacer z par γ(t) et multiplier par γ′(t)' },
  { id: 'int', label: 'Intégrer en t' },
  { id: 'nodz', label: 'Remplacer z par γ(t), sans γ′(t)', rule: 'c_contour_dz_forgot', why: 'dz = γ′(t) dt : le facteur γ′(t) est nécessaire.' },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || 'Ce n\'est pas l\'étape à faire maintenant.' }));

function cpData(rng, level) {
  const pool = level <= 2 ? ['conj', 're', 'sq', 'conj', 'inv'] : ['conj', 're', 'im', 'abs2', 'sq', 'inv', 'conj'];
  const fn = rng.pick(pool);
  if (fn === 'inv' || rng.chance(0.45)) return circData(rng, fn);
  return segData(rng, fn) || circData(rng, fn);
}

function cpParts(d, level) {
  const tcfg = (extra) => CV({ vars: ['t'], real: ['t'], domain: { t: d.kind === 'seg' ? [0, 1] : [0, 6.2] }, ...extra });
  const fname = d.fn === 'inv' ? '1/z' : FN[d.fn].name;
  const fOfG = d.fn === 'inv' ? `1/(${d.gamma})` : FN[d.fn].of(d.gamma);
  const parts = [];
  if (level >= 2) {
    parts.push({
      html: `γ est ${d.desc} :`, ask: 'γ(t) =', start: `γ : ${d.kind === 'seg' ? `segment de ${rdc(d.ps)} à ${rdc(d.qs)}` : `cercle ${circleT(d.z0s, d.R)}`}`,
      judge: { kind: 'param', complex: true, curve: { ref: d.ref, t: d.t, ...(d.kind === 'circ' ? { closed: true } : {}) } },
      lines: [eq(d.line, d.kind === 'seg' ? 'p + (q − p)t' : 'z₀ + Re^(it)', 'param', d.kind === 'seg' ? [d.gamma] : [d.gamma])], menu: CP_MENU('param'),
    });
  }
  parts.push({
    html: level === 1 ? `γ(t) = ${M(d.gamma)}, t ∈ [0 ; ${rd(d.hi)}].` : 'Sa dérivée :', ask: 'γ′(t) =', start: `d(${d.gamma}, t)`, judge: tcfg(),
    lines: [eq(d.gp, 'dériver en t', 'deriv', [d.gp])], menu: CP_MENU('deriv'),
  });
  parts.push({
    html: `On remplace z par γ(t) dans f(z) = ${M(fname)}, et dz = γ′(t) dt :`, ask: 'f(γ(t)) γ′(t) =', start: fOfG,
    judge: tcfg({ expect: `(${fOfG})·(${d.gp})`, traps: { c_contour_dz_forgot: [{ line: d.fg, ctx: { gp: rd(d.gp) } }] } }),
    lines: [eq(d.integrand, 'f(γ(t))·γ′(t), simplifié', 'deriv', [d.integrand])], menu: CP_MENU('subst'),
  });
  parts.push({
    html: 'Puis l\'intégrale en t :', ask: '∫_γ f(z) dz =', start: `int(${d.integrand}, t, 0, ${d.hi})`, judge: CV({ vars: ['t'] }),
    lines: [eq(d.value, 'intégrer en t', 'value', [d.value])], menu: CP_MENU('int'),
  });
  return parts;
}

function cpLines(level, rng, opts) {
  const d = cpData(rng, level);
  const fname = d.fn === 'inv' ? '1/z' : FN[d.fn].name;
  return linesOf({
    level, skill: CP, key: `${CP}:${level}:${d.key}`, keys: KEYS_T, subgoals: CP_SUB, exam: examTag(opts, 3),
    prompt: `Calcule ∫_γ ${M(fname)} dz, où γ est ${d.desc}.`,
    parts: cpParts(d, level),
    hints: H('∫_γ f(z) dz = ∫ f(γ(t)) γ′(t) dt : paramètre γ, dérive, remplace.', `γ(t) = ${M(d.gamma)}, γ′(t) = ${M(d.gp)}`, M(d.integrand)),
  });
}

// Level 5: ∫ z̄ dz from 2 to 0 on the upper half circle |z − 1| = 1 and on the segment.
function cpProblem(level, rng, opts) {
  const a = rng.pick([1, 2]);
  const half = {
    kind: 'circ', fn: 'conj', gamma: `${a}+${a === 1 ? '' : a}e^(it)`, gp: `${a === 1 ? '' : a}ie^(it)`, t: [0, 'π'], hi: 'π',
    fg: `${a}+${a === 1 ? '' : a}e^(-it)`, integrand: `${a === 1 ? '' : a * a}i+${a === 1 ? '' : a * a}ie^(it)`, value: `-${2 * a * a}+${a * a === 1 ? '' : a * a}πi`,
    desc: `le demi-cercle supérieur |z − ${a}| = ${a}, de ${2 * a} à 0`, line: `γ(t) = ${a}+${a === 1 ? '' : a}e^(it), t ∈ [0 ; π]`, ref: `${a}+${a === 1 ? '' : a}e^(it)`, key: `half:${a}`,
    z0s: String(a), R: a,
  };
  const seg = {
    kind: 'seg', fn: 'conj', gamma: `${2 * a}-${2 * a}t`, gp: String(-2 * a), t: [0, 1], hi: '1', ps: String(2 * a), qs: '0',
    fg: `${2 * a}-${2 * a}t`, integrand: `${-4 * a * a}+${4 * a * a}t`, value: String(-2 * a * a),
    desc: `le segment de ${2 * a} à 0`, line: `γ(t) = ${2 * a}-${2 * a}t, t ∈ [0 ; 1]`, ref: `${2 * a}-${2 * a}t`, key: `seg2:${a}`,
  };
  const mk = (d) => linesOf({ level: 4, skill: CP, key: `${CP}:5:${d.key}`, keys: KEYS_T, subgoals: CP_SUB, prompt: `∫_γ ${M('conj(z)')} dz, où γ est ${d.desc}.`, parts: cpParts(d, 4), hints: H('', '', '') });
  const why = choice({
    skill: CP, level, key: `5:why:${a}`, prompt: 'Les deux chemins ont les mêmes extrémités, mais les intégrales diffèrent. Pourquoi ?',
    right: `${M('conj(z)')} n'est pas holomorphe (u_x = 1, v_y = −1) : l'intégrale dépend du chemin.`,
    wrongs: [
      { html: 'Les intégrales sont égales : il y a une erreur de calcul.', rule: 'c_conj_not_holo' },
      { html: 'Le demi-cercle n\'est pas une courbe fermée.' },
      { html: 'Le segment est parcouru dans le mauvais sens.' },
    ],
  }, rng);
  return problemItem({
    skill: CP, level, key: `5:${a}`, exam: examTag(opts, 6), prompt: `Compare ∫ ${M('conj(z)')} dz de ${2 * a} à 0 sur deux chemins.`,
    parts: [{ item: mk(half), points: 2.5, title: 'Le demi-cercle' }, { item: mk(seg), points: 2.5, title: 'Le segment' }, { item: why, points: 1, title: 'Conclusion' }],
  });
}

function cpMcq(level, rng, opts) {
  const R = rng.pick([1, 2, 3]);
  const R2 = R * R;
  if (opts.multi) {
    const pool = [
      { html: `∮ sur ${M(`|z| = ${R}`)} de ${M('conj(z)')} dz vaut ${M(`${2 * R2}πi`)}`, truth: true },
      { html: `∮ sur ${M(`|z| = ${R}`)} de ${M('conj(z)')} dz vaut 0`, truth: false, rule: 'c_conj_not_holo' },
      { html: `∮ sur ${M(`|z| = ${R}`)} de ${M('z^2')} dz vaut 0`, truth: true },
      { html: `∮ sur ${M(`|z| = ${R}`)} de dz/z vaut ${M('2πi')}`, truth: true },
      { html: `∮ sur ${M(`|z| = ${R}`)} de ${M('|z|^2')} dz vaut ${M(`${2 * R2}π`)}`, truth: false },
      { html: `sur γ(t) = ${M(`${R}e^(it)`)}, dz = ${M(`${R}ie^(it)`)} dt`, truth: true },
    ];
    const s = multiOf(rng, pool, 5);
    return choice({ skill: CP, level, multi: true, key: `multi:${R}:${s.map((x) => pool.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: 'Cochez les affirmations vraies.', options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  return choice({
    skill: CP, level, key: `mcq:${R}`, exam: examTag(opts, 2),
    prompt: `∮ ${M('conj(z)')} dz sur le cercle ${M(`|z| = ${R}`)} (sens positif) vaut :`,
    right: M(`${2 * R2}πi`),
    wrongs: [opt('0', 'c_conj_not_holo'), opt('2πi'), opt(`${2 * R}π`), opt(`${R2 === 1 ? '' : R2}πi`)],
    solution: [{ html: `γ(t) = ${M(`${R}e^(it)`)} : z̄ dz = ${M(`${R}e^(-it)·${R}ie^(it)`)} dt = ${M(`${R2}i`)} dt, intégré sur [0 ; 2π].`, note: '' }],
  }, rng);
}

// ======================================================================
// c-cauchy-thm
// ======================================================================

const CT = 'c-cauchy-thm';
const CT_SUB = [
  { id: 'singularities', label: 'trouver les singularités', skill: CT },
  { id: 'locate', label: 'les placer par rapport à Γ', skill: CT },
  { id: 'hyp', label: 'hypothèses de Cauchy', skill: CT },
  { id: 'conclude', label: '∮ f dz = 0', skill: CT },
];

// f = num/den, singularities: [{text, value: {re, im}}]; contour |z − c| = R.
const SING = ['0', '1', '-1', '2', '-2', 'i', '-i', '2i', '-2i', '3', '1+i'];
const NUMS = ['1', 'e^z', 'cos(z)', 'z', 'z^2', 'sin(z)'];
const CENTERS = [['0', 0, 0], ['i', 0, 1], ['1', 1, 0], ['-1', -1, 0], ['2', 2, 0]];
const dist = (s, c) => Math.hypot(s.re - c[1], s.im - c[2]);
const fz = (s) => (s === '0' ? 'z' : `(${joinT(['z', zt(X(s).neg())])})`);

function ctRational(rng, want) {
  // want: 'out' (every singularity outside), 'in', 'on'.
  for (let k = 0; k < 300; k++) {
    const [cs, cx, cy] = rng.pick(CENTERS);
    const R = rng.pick([1, 2, 3, 0.5]);
    const n = rng.pick([1, 1, 2]);
    const sings = pickK(rng, SING, n);
    const pows = sings.map(() => rng.pick([1, 1, 2]));
    const vals = sings.map((s) => { const z = X(s); return { re: z.re.valueOf(), im: z.im.valueOf() }; });
    const ds = vals.map((v) => dist(v, [0, cx, cy]));
    const where = ds.map((d) => (Math.abs(d - R) < 1e-9 ? 'on' : d < R ? 'in' : 'out'));
    if (want === 'out' && !where.every((w) => w === 'out')) continue;
    if (want === 'in' && !(where.includes('in') && !where.includes('on'))) continue;
    if (want === 'on' && !where.includes('on')) continue;
    const num = rng.pick(NUMS);
    // A zero of the numerator at a singularity would cancel it: avoid.
    if ((num === 'z' || num === 'z^2' || num === 'sin(z)') && sings.includes('0')) continue;
    const den = sings.map((s, i) => `${fz(s)}${pows[i] > 1 ? `^${pows[i]}` : ''}`).join('');
    const denT = den;
    const single = sings.length === 1 && pows[0] === 1;
    const f = `${num}/${single ? den : `(${den})`}`;
    return { kind: 'rat', f, num, sings, vals, ds, where, R, c: cs, cx, cy, den: denT, key: `rat:${f}:${cs}:${R}` };
  }
  return null;
}

function ctCos(rng) {
  // e^z/cos z or 1/cos z: singularities π/2 + kπ, |±π/2| ≈ 1,57.
  const R = rng.pick([1, 1.5]);
  const num = rng.pick(['e^z', '1', 'z']);
  return { kind: 'cos', f: num === '1' ? '1/cos(z)' : `${num}/cos(z)`, num, sings: ['π/2', '-π/2'], vals: [{ re: Math.PI / 2, im: 0 }, { re: -Math.PI / 2, im: 0 }], ds: [Math.PI / 2, Math.PI / 2], where: ['out', 'out'], R, c: '0', cx: 0, cy: 0, key: `cos:${num}:${R}` };
}

const rT = (R) => String(R).replace('.', ',');
const placeDecision = (d, i) => {
  const s = d.sings[i];
  const w = d.where[i];
  const dd = Math.round(d.ds[i] * 100) / 100;
  return {
    kind: 'decision', prompt: `${rd(s)} est à distance ${String(dd).replace('.', ',')} du centre ${rd(d.c)}, et le rayon vaut ${rT(d.R)} : ${rd(s)} est`, options: [
      { id: 'in', label: 'dans le disque', valid: w === 'in', ...(w === 'in' ? {} : { rule: 'c_pole_outside_counted', why: `${String(dd).replace('.', ',')} > ${rT(d.R)} : ${rd(s)} est dehors.` }) },
      { id: 'on', label: 'sur le cercle Γ', valid: w === 'on', ...(w === 'on' ? {} : { why: `${String(dd).replace('.', ',')} ≠ ${rT(d.R)}.` }) },
      { id: 'out', label: 'hors du disque fermé', valid: w === 'out', ...(w === 'out' ? {} : { why: 'Compare la distance au rayon.' }) },
    ],
  };
};

function ctParts(d, level) {
  const parts = [];
  const contour = circleML(d.c, rT(d.R).replace(',', '.'));
  const conclude = {
    kind: 'decision', prompt: 'Conclusion :', options: [
      { id: 'cauchy', label: 'f est holomorphe sur un disque un peu plus grand que Γ (simplement connexe) : ∮ = 0 par Cauchy', valid: true },
      { id: 'undef', label: 'L\'intégrale n\'est pas définie', valid: false, rule: 'c_pole_on_contour', why: 'Aucune singularité n\'est sur Γ.' },
      { id: 'res', label: 'Il faut les résidus des singularités', valid: false, rule: 'c_pole_outside_counted', why: 'Les singularités sont hors du disque : elles ne comptent pas.' },
    ],
  };
  const valuePart = {
    html: level === 1 ? 'Place chaque singularité, puis conclus.' : 'Place les singularités par rapport à Γ, puis conclus :', ask: '∮_Γ f(z) dz =',
    start: 'I', judge: CV({ raw: { text: 'I', html: oint(contour) }, expect: '0', final: 'number' }),
    decisions: [...d.sings.map((s, i) => placeDecision(d, i)).slice(0, 2), conclude],
    lines: [eq('0', 'théorème de Cauchy', 'conclude', ['0'])],
    menu: [
      { id: 'cauchy', label: 'Théorème de Cauchy : f holomorphe sur un domaine simplement connexe qui contient Γ', valid: true },
      { id: 'res', label: 'Théorème des résidus avec toutes les singularités', valid: false, rule: 'c_pole_outside_counted', why: 'Les singularités hors du disque ne comptent pas.' },
    ],
  };
  if (level === 1) {
    valuePart.html = `Les singularités de f sont ${d.kind === 'cos' ? 'les π/2 + kπ, la plus proche de 0 étant ±π/2' : d.sings.map(rd).join(' et ')}. ${valuePart.html}`;
    parts.push(valuePart);
    return parts;
  }
  if (d.kind === 'cos') {
    parts.push({
      html: 'Les singularités sont les zéros du dénominateur :', ask: 'cos z = 0 ⇔', start: 'cos(z) = 0',
      judge: CF({ sols: ['π/2'], period: 'π', periodText: 'kπ', final: 'family' }),
      lines: [eq('z = π/2+kπ ; k ∈ ℤ', 'cos z = 0 ⇔ z = π/2 + kπ (aussi dans ℂ)', 'singularities', ['π/2'])],
      menu: [{ id: 'zeros', label: 'Chercher les zéros du dénominateur', valid: true }, { id: 'none', label: 'cos z ne s\'annule pas', valid: false, why: 'cos(π/2) = 0.' }],
    });
  } else {
    parts.push({
      html: 'Les singularités sont les zéros du dénominateur :', ask: 'z :', start: `${d.den} = 0`, judge: SETZ,
      lines: [eq(d.sings.map((s) => `z = ${s}`).join(' ou '), 'zéros du dénominateur', 'singularities', d.sings)],
      menu: [{ id: 'zeros', label: 'Chercher les zéros du dénominateur', valid: true }, { id: 'num', label: 'Chercher les zéros du numérateur', valid: false, why: 'Les singularités sont là où le dénominateur s\'annule.' }],
    });
  }
  parts.push(valuePart);
  return parts;
}

function ctLines(level, rng, opts) {
  const d = (rng.chance(0.25) ? ctCos(rng) : ctRational(rng, 'out')) || ctCos(rng);
  return linesOf({
    level, skill: CT, key: `${CT}:${level}:${d.key}`, keys: [...KEYS, 'set'], subgoals: CT_SUB, exam: examTag(opts, 3),
    prompt: `Calcule ${oint(circleML(d.c, rT(d.R).replace(',', '.')))} pour ${M(`f(z) = ${d.f}`)} (sens positif).`,
    parts: ctParts(d, level),
    hints: H('Où sont les zéros du dénominateur ? Compare leur distance au centre avec le rayon.', d.kind === 'cos' ? `${M('cos(z) = 0')} ⇔ z = π/2 + kπ` : `singularités : ${d.sings.map(rd).join(', ')}`, 'Toutes sont hors du disque fermé : ∮ = 0 par le théorème de Cauchy.'),
  });
}

// Is ∮_{|z|=1} f dz = 0? 'zero' | 'undef' | 'nonzero', with residues.
const CT_POOL = [
  ['1/z', 'nonzero'], ['cos(z)/z^2', 'zero'], ['1/(z(z+1))', 'undef'], ['1/(z+2)^2', 'zero'], ['cos(z)/z^3', 'nonzero'],
  ['sin(z)/z^3', 'zero'], ['e^z/z', 'nonzero'], ['1/(z-3)^2', 'zero'], ['z^2/(z-2)', 'zero'], ['e^z/(z-1)', 'undef'],
  ['1/(z^2+4)', 'zero'], ['1/(z(z-1))', 'undef'], ['e^z/cos(z)', 'zero'], ['1/(z-i)', 'undef'], ['z/(2z-1)', 'nonzero'],
];
const CT_ONLY_CAUCHY = new Set(['1/(z+2)^2', '1/(z-3)^2', 'z^2/(z-2)', '1/(z^2+4)', 'e^z/cos(z)']);

function ctMcq(level, rng, opts) {
  if (opts.multi) {
    const s = multiOf(rng, CT_POOL.map(([f, w]) => ({ f, truth: w === 'zero', w })), 5);
    return choice({
      skill: CT, level, multi: true, key: `multi:${s.map((x) => x.f).join(',')}`, exam: examTag(opts, 2),
      prompt: `Pour quelles fonctions ${oint('<mo>|</mo><mi>z</mi><mo>|</mo><mo>=</mo><mn>1</mn>')} = 0 ?`,
      options: s.map((x) => ({ html: M(`f(z) = ${x.f}`), correct: x.truth, rule: x.w === 'undef' ? 'c_pole_on_contour' : null })),
    }, rng);
  }
  const right = rng.pick([...CT_ONLY_CAUCHY]);
  const undef = rng.pick(CT_POOL.filter(([, w]) => w === 'undef'));
  const others = pickK(rng, CT_POOL.filter(([f, w]) => w === 'nonzero'), 2);
  return choice({
    skill: CT, level, key: `mcq:${right}:${undef[0]}:${others.map((x) => x[0]).join(',')}`, exam: examTag(opts, 2),
    prompt: `Pour laquelle de ces fonctions a-t-on ${oint('<mo>|</mo><mi>z</mi><mo>|</mo><mo>=</mo><mn>1</mn>')} = 0 par le théorème de Cauchy ?`,
    right: M(`f(z) = ${right}`),
    wrongs: [opt(`f(z) = ${undef[0]}`, 'c_pole_on_contour'), ...others.map(([f]) => opt(`f(z) = ${f}`))],
    solution: [{ html: `Les singularités de ${M(right)} sont hors du disque fermé |z| ≤ 1 ; ${M(undef[0])} a une singularité sur le cercle.`, note: '' }],
  }, rng);
}

// Level 5: four functions, each « 0 par Cauchy », « non définie » or « résidus ».
function ctProblem(level, rng, opts) {
  const pick = [...pickK(rng, CT_POOL.filter(([f]) => CT_ONLY_CAUCHY.has(f)), 2), rng.pick(CT_POOL.filter(([, w]) => w === 'undef')), rng.pick(CT_POOL.filter(([, w]) => w === 'nonzero'))];
  const order = pickK(rng, pick, 4);
  const parts = order.map(([f, w], i) => ({
    item: choice({
      skill: CT, level, key: `5:${f}`, prompt: `${oint('<mo>|</mo><mi>z</mi><mo>|</mo><mo>=</mo><mn>1</mn>')} pour ${M(`f(z) = ${f}`)} :`,
      right: w === 'zero' ? 'vaut 0 par le théorème de Cauchy' : w === 'undef' ? 'n\'est pas définie : une singularité est sur le cercle' : 'demande les résidus : une singularité est dans le disque',
      wrongs: [
        w !== 'zero' ? { html: 'vaut 0 par le théorème de Cauchy', rule: w === 'undef' ? 'c_pole_on_contour' : null } : null,
        w !== 'undef' ? { html: 'n\'est pas définie : une singularité est sur le cercle' } : null,
        w !== 'nonzero' ? { html: 'demande les résidus : une singularité est dans le disque', rule: 'c_pole_outside_counted' } : null,
      ],
    }, rng),
    points: 1, title: `Fonction ${i + 1}`,
  }));
  return problemItem({ skill: CT, level, key: `5:${order.map((x) => x[0]).join(',')}`, exam: examTag(opts, 4), prompt: 'Pour chaque fonction, que vaut l\'intégrale sur le cercle unité ?', parts });
}

// ======================================================================
// c-cauchy-formula
// ======================================================================

const CFm = 'c-cauchy-formula';
const CFm_SUB = [
  { id: 'identify', label: 'identifier g et n', skill: CFm },
  { id: 'value', label: '2πi g⁽ⁿ⁾(z₀)/n!', skill: CFm },
];

// k·unit·atom as text, k = a + bi exact: aπe² + bπie².
function kText(k, unit, atom) {
  // c·body with a fraction written after: πi/8, 3πie²/2.
  const ft = (c, body) => (c.d === 1 || !body ? term(c, body) : `${c.n < 0 ? '-' : ''}${Math.abs(c.n) === 1 ? '' : Math.abs(c.n)}${body}/${c.d}`);
  const re = k.re.n === 0 ? '' : ft(k.re, `${unit}${atom}`);
  const im = k.im.n === 0 ? '' : ft(k.im, `${unit}i${atom}`);
  return joinT([re, im]);
}

// g, n, z₀, g⁽ⁿ⁾ (text) and g⁽ⁿ⁾(z₀) = coef·atom, or null.
function gData(rng) {
  const kind = rng.pick(['exp', 'exp', 'cos', 'sin', 'pow', 'frac']);
  const n = rng.pick([0, 1, 2, 2, 3]);
  const z0 = rng.pick(['0', '0', '1', 'i']);
  if (kind === 'exp') {
    const a = rng.pick([1, 2, 3]);
    const g = a === 1 ? 'e^z' : `e^(${a}z)`;
    const gn = n === 0 ? g : `${a ** n === 1 ? '' : a ** n}${g}`;
    const atom = z0 === '0' ? '' : z0 === '1' ? (a === 1 ? 'e' : `e^${a}`) : (a === 1 ? 'e^i' : `e^(${a}i)`);
    return { kind, g, n, z0, gn, coef: new CQ(a ** n), atom };
  }
  if (kind === 'cos' || kind === 'sin') {
    const cyc = kind === 'cos' ? ['cos(z)', '-sin(z)', '-cos(z)', 'sin(z)'] : ['sin(z)', 'cos(z)', '-sin(z)', '-cos(z)'];
    const gn = cyc[n % 4];
    const sg = gn.startsWith('-') ? -1 : 1;
    const fn = gn.replace('-', '').replace('(z)', '');
    if (z0 === '0') {
      if (fn === 'sin') return null;
      return { kind, g: `${kind}(z)`, n, z0, gn, coef: new CQ(sg), atom: '' };
    }
    if (z0 === '1') return { kind, g: `${kind}(z)`, n, z0, gn, coef: new CQ(sg), atom: `${fn}(1)` };
    return { kind, g: `${kind}(z)`, n, z0, gn, coef: fn === 'cos' ? new CQ(sg) : new CQ(0, sg), atom: fn === 'cos' ? 'cosh(1)' : 'sinh(1)' };
  }
  if (kind === 'pow') {
    const k = rng.pick([2, 3, 4]);
    if (n > k || z0 === '0') return null;
    const c = fac(k) / fac(k - n);
    const e = k - n;
    const gn = `${c === 1 && e ? '' : c}${e === 0 ? '' : e === 1 ? 'z' : `z^${e}`}`;
    let p = new CQ(c);
    for (let j = 0; j < e; j++) p = p.mul(X(z0));
    return { kind, g: `z^${k}`, n, z0, gn, coef: p, atom: '' };
  }
  // 1/(z − b) around z₀ = 0, b outside the circle |z| = 2.
  if (z0 !== '0') return null;
  const b = rng.pick(['3', '-3', '3i', '4']);
  const zb = b.startsWith('-') ? `(${b})` : b;
  const c = (n % 2 ? -1 : 1) * fac(n);
  const gn = n === 0 ? `1/(z-${zb})` : `${c}/(z-${zb})^${n + 1}`;
  let p = new CQ(1);
  for (let j = 0; j <= n; j++) p = p.mul(X(b).neg());
  return { kind, g: `1/(z-${zb})`, n, z0, gn, coef: new CQ(c).div(p), atom: '' };
}

function cfData(rng) {
  for (let k = 0; k < 200; k++) {
    const d = gData(rng);
    if (!d) continue;
    const pw = d.n + 1;
    const base = d.z0 === '0' ? 'z' : `(z-${d.z0})`;
    const den = pw === 1 ? base : `${base}^${pw}`;
    const f = d.kind === 'frac' ? `1/(${den}(z-${d.g.slice(5, -1)}))` : `${d.g}/${den}`;
    const gz0 = kText(d.coef, '', d.atom);
    const value = kText(d.coef.mul(new CQ(0, 2)).div(new CQ(fac(d.n))), 'π', d.atom);
    const noFac = kText(d.coef.mul(new CQ(0, 2)), 'π', d.atom);
    const no2pi = kText(d.coef.div(new CQ(fac(d.n))), '', d.atom);
    if (value === '0') continue;
    const wrong = d.n >= 2 ? [{ line: noFac, ctx: { n: d.n } }] : [];
    return { ...d, pw, f, R: 2, c: d.z0, gz0, value, noFac, no2pi, wrong, key: `${d.kind}:${d.g}:${d.n}:${d.z0}` };
  }
  return { kind: 'exp', g: 'e^(2z)', n: 2, z0: '0', gn: '4e^(2z)', gz0: '4', pw: 3, f: 'e^(2z)/z^3', R: 2, c: '0', value: '4πi', noFac: '8πi', no2pi: '2', wrong: [{ line: '8πi', ctx: { n: 2 } }], key: 'fallback', fallback: true };
}

function cfParts(d, level) {
  const parts = [];
  const ndec = {
    kind: 'decision', prompt: `La puissance de ${d.z0 === '0' ? 'z' : `(z − ${rd(d.z0)})`} est ${d.pw} : n =`, options: [
      { id: 'n', label: `${d.n} (puissance n + 1)`, valid: true },
      { id: 'n1', label: `${d.pw}`, valid: false, rule: 'c_cauchy_n_factor', why: `La puissance est n + 1 = ${d.pw}, donc n = ${d.n}.` },
    ],
  };
  if (d.n > 0) {
    parts.push({
      html: level === 1 ? `g(z) = ${M(d.g)}, z₀ = ${rd(d.z0)} et n = ${d.n} : on dérive g ${d.n} fois.` : `On écrit l'intégrande g(z)/(z − z₀)^(n+1), puis on dérive g :`,
      ask: `g⁽${d.n}⁾(z) =`, start: Array.from({ length: d.n }).reduce((s) => `d(${s}, z)`, d.g), judge: CV({ vars: ['z'], cz: ['z'], box: [-1, 1] }),
      decisions: level === 1 ? [] : [ndec], lines: [eq(d.gn, `dériver ${d.n} fois`, 'identify', [d.gn])],
      menu: CF_MENU('deriv'),
    });
  }
  const contour = circleML(d.c, d.R);
  const lines = [];
  if (d.n > 0) lines.push(eq(`2πi·${/^[\w^()π]+$/.test(d.gz0) && !d.gz0.startsWith('(') ? d.gz0 : `(${d.gz0})`}/${d.n}!`, `2πi g⁽ⁿ⁾(z₀)/n!`, 'value'));
  lines.push(eq(d.value, d.n > 0 ? '' : '2πi g(z₀)', 'value', [d.value]));
  parts.push({
    html: d.n > 0 ? 'Formule de Cauchy :' : `g(z) = ${M(d.g)} est holomorphe et z₀ = ${rd(d.z0)} est à l'intérieur de Γ :`, ask: '∮_Γ f(z) dz =',
    start: 'I', judge: CV({ raw: { text: 'I', html: oint(contour) }, expect: d.value, traps: { c_cauchy_n_factor: d.wrong } }),
    decisions: d.n === 0 && level > 1 ? [ndec] : [], lines, menu: CF_MENU('formula'),
  });
  return parts;
}
const CF_MENU = (right) => [
  { id: 'deriv', label: 'Dériver g n fois' },
  { id: 'formula', label: 'f⁽ⁿ⁾(z₀) = n!/(2πi) ∮ f/(z − z₀)ⁿ⁺¹ : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!' },
  { id: 'zero', label: '∮ = 0 par le théorème de Cauchy', why: 'z₀ est une singularité à l\'intérieur de Γ.' },
  { id: 'nofac', label: '∮ = 2πi g⁽ⁿ⁾(z₀) (sans n!)', rule: 'c_cauchy_n_factor', why: 'La formule divise par n!.' },
].map((o) => ({ ...o, valid: o.id === right, why: o.why || 'Ce n\'est pas l\'étape à faire maintenant.' }));

function cfLines(level, rng, opts) {
  const d = cfData(rng);
  const contour = circleML(d.c, d.R);
  const dec = level === 3 ? [{
    kind: 'decision', prompt: 'Quelle méthode ?', options: [
      { id: 'zero', label: 'Cauchy : ∮ = 0', valid: false, why: `${rd(d.z0)} est une singularité à l'intérieur de Γ.` },
      { id: 'formula', label: 'Formule intégrale de Cauchy', valid: true, ref: true },
      { id: 'res', label: 'Théorème des résidus', valid: true, quality: 'poor', why: 'Juste aussi, mais la formule de Cauchy est directe ici.' },
    ],
  }] : [];
  const parts = cfParts(d, level);
  parts[0].decisions = [...dec, ...(parts[0].decisions || [])];
  return linesOf({
    level, skill: CFm, key: `${CFm}:${level}:${d.key}`, keys: [...KEYS, 'calcx'], subgoals: CFm_SUB, exam: examTag(opts, 2), fallback: d.fallback,
    prompt: `Calcule ${oint(contour)} pour ${M(`f(z) = ${d.f}`)} (sens positif).`,
    parts,
    hints: H('Écris l\'intégrande g(z)/(z − z₀)ⁿ⁺¹ avec g holomorphe : ∮ = 2πi g⁽ⁿ⁾(z₀)/n!.', `n = ${d.n}, g(z) = ${M(d.g)}, g⁽ⁿ⁾(z₀) = ${M(d.gz0)}`, M(d.value)),
  });
}

const CF_STATEMENTS = [
  { html: `${M('f^(n)(z_0)')} = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ⁺¹ dz`, truth: true },
  { html: `${M('f^(n)(z_0)')} = n!/(2πi) ∮ f(z)/(z − z₀)ⁿ dz`, truth: false, rule: 'c_cauchy_n_factor' },
  { html: '∮ dz/(z − z₀) = 2πi pour un cercle autour de z₀ (sens positif)', truth: true },
  { html: '∮ f(z)/(z − z₀) dz = 0 si f est holomorphe et z₀ intérieur à Γ', truth: false },
  { html: '∮ f(z)/(z − z₀)² dz = 2πi f′(z₀) si f est holomorphe et z₀ intérieur à Γ', truth: true },
  { html: '∮ f(z)/(z − z₀)³ dz = 2πi f″(z₀)', truth: false, rule: 'c_cauchy_n_factor' },
];

function cfMcq(level, rng, opts) {
  if (opts.multi) {
    const s = multiOf(rng, CF_STATEMENTS, 5);
    return choice({ skill: CFm, level, multi: true, key: `multi:${s.map((x) => CF_STATEMENTS.indexOf(x)).join('')}`, exam: examTag(opts, 2), prompt: 'Γ est un cercle parcouru une fois dans le sens positif, f holomorphe sur un disque qui le contient. Cochez les affirmations vraies.', options: s.map((x) => ({ html: x.html, correct: x.truth, rule: x.truth ? null : x.rule ?? null })) }, rng);
  }
  let d = cfData(rng);
  for (let k = 0; k < 50 && d.n < 2; k++) d = cfData(rng);
  const contour = circleML(d.c, d.R);
  return choice({
    skill: CFm, level, key: `mcq:${d.key}`, exam: examTag(opts, 2), fallback: d.fallback,
    prompt: `${oint(contour)} pour ${M(`f(z) = ${d.f}`)} vaut :`,
    right: M(d.value),
    wrongs: [
      d.n >= 2 ? opt(d.noFac, 'c_cauchy_n_factor') : null,
      opt(d.no2pi, 'c_residue_2pii'),
      opt('0'),
      opt('2πi'),
    ],
    solution: [{ html: `n = ${d.n}, g(z) = ${M(d.g)} : ∮ = 2πi g⁽ⁿ⁾(${rd(d.z0)})/n! = ${M(d.value)}.`, note: '' }],
  }, rng);
}

function cfProblem(level, rng, opts) {
  const calc = cfLines(4, rng, {});
  const s = rng.pick([0, 1]);
  const st = choice({
    skill: CFm, level, key: `5:st:${s}`, prompt: 'f est holomorphe sur un disque qui contient le cercle Γ (sens positif), z₀ à l\'intérieur. Quelle formule est juste ?',
    right: CF_STATEMENTS[s === 0 ? 0 : 4].html,
    wrongs: [{ html: CF_STATEMENTS[1].html, rule: 'c_cauchy_n_factor' }, { html: CF_STATEMENTS[5].html, rule: 'c_cauchy_n_factor' }, { html: CF_STATEMENTS[3].html }],
  }, rng);
  return problemItem({
    skill: CFm, level, key: `5:${calc.key}:${s}`, exam: examTag(opts, 3), prompt: 'La formule intégrale de Cauchy, puis un calcul.',
    parts: [{ item: st, points: 1, title: 'La formule' }, { item: calc, points: 2, title: 'Le calcul' }],
  });
}

export const GEN = {
  [CP]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return cpMcq(4, rng, opts);
    if (level === 5) return rng.chance(0.5) ? cpProblem(5, rng, opts) : cpLines(5, rng, opts);
    return cpLines(level, rng, opts);
  },
  [CT]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return ctMcq(4, rng, opts);
    if (level === 5) return ctProblem(5, rng, opts);
    return ctLines(opts.exam === 'open' ? 4 : level, rng, opts);
  },
  [CFm]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return cfMcq(4, rng, opts);
    if (level === 5) return cfProblem(5, rng, opts);
    return cfLines(level, rng, opts);
  },
};

void cq; void piT; void residue; void FN;
