// c-int-branch, c-fourier-residues and c-conformal (module C, part b, step
// U10).
// - c-int-branch: ∫₀^∞ x^a R(x) dx with z^a, arg z ∈ ]0 ; 2π[ (keyhole):
//   (1 − e^(2πia)) I = 2πi Σ Res; the residues are written with explicit
//   exponentials (−1 = e^(iπ), −i = e^(3iπ/2)), so the evaluator follows
//   the branch of the cut; the value is checked by quadrature (`definite`).
// - c-fourier-residues: f̂(α) = (1/√(2π)) ∫ f(x)e^(−iαx) dx closed below for
//   α > 0 (−2πi Σ Res), then written for every α with |α| (judge
//   `transform`, the Fourier table of the course: 1/√(2π)).
// - c-conformal (optional): images of points by a homography (`cval`), the
//   homography sending three points (`cval` with vars ['z']), images of
//   lines and regions (multiple choice).

import { parse } from '../../cas/parse.js';
import { evalComplex } from '../../cas/complex.js';
import { fourierAt } from '../../cas/transforms.js';
import {
  q, cq, cT, cP, rd, CM, inner, resLabel, mathLabel, CV, checkRes, checkValue, VERIFY, SG, L, chain, choice, opt,
  partsItem, H, examTag, KEYS, pick, asProblem,
} from './cplx-b-kit.js';
import { mcq } from './kit.js';
import { evalFloat } from '../../cas/numeric.js';

// A float as an exact text: k/m, k√2/m or k√3/m (m ≤ 24), else null.
function closeT(x) {
  if (Math.abs(x) < 1e-12) return '0';
  for (const [r, name] of [[1, ''], [Math.SQRT2, '√2'], [Math.sqrt(3), '√3']]) {
    for (let m = 1; m <= 24; m++) {
      const k = (x / r) * m;
      if (Math.abs(k - Math.round(k)) < 1e-9) {
        const K = Math.round(k);
        const g = gcd(Math.abs(K), m);
        const n = K / g;
        const d = m / g;
        if (!name) return d === 1 ? String(n) : `${n}/${d}`;
        const num = n === 1 ? name : n === -1 ? `-${name}` : `${n}${name}`;
        return d === 1 ? num : `${num}/${d}`;
      }
    }
  }
  return null;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
// a + bi from floats, exact text.
function closeC(z) {
  const a = closeT(z.re);
  const b = closeT(z.im);
  if (a === null || b === null) return null;
  if (b === '0') return a;
  const bAbs = b.startsWith('-') ? b.slice(1) : b;
  // i written before a radical: 'i√2/2', '3i√2/4'; else after the number: '3i/2'.
  const [nb, db] = bAbs.split('/');
  const m = /^(\d*)(√\d+)?$/.exec(nb);
  const bi = `${m[1] === '1' && !m[2] ? '' : m[1]}i${m[2] || ''}${db ? `/${db}` : ''}`;
  if (a === '0') return `${b.startsWith('-') ? '-' : ''}${bi}`;
  return `${a}${b.startsWith('-') ? '-' : '+'}${bi}`;
}
const cval = (text) => evalComplex(parse(text, { complex: true }), {});

// ======================================================================
// c-int-branch
// ======================================================================

const SB = 'c-int-branch';
const aT = (a) => String(a);
const piA = (num, a) => { const r = q(num).mul(a); return r.eq(1) ? 'π' : r.eq(-1) ? '-π' : r.d === 1 ? `${r.n}π` : `${r.n === 1 ? '' : r.n === -1 ? '-' : r.n}π/${r.d}`; };

function branchData(rng, { l5 = false } = {}) {
  const kind = l5 ? 'sq' : pick(rng, ['one', 'one', 'two', 'sq', 'sq']);
  const a = kind === 'sq' ? pick(rng, [q(-1, 2), q(1, 3), q(-1, 3), q(1, 2)]) : kind === 'two' ? q(-1, 2) : pick(rng, [q(-1, 2), q(-1, 3)]);
  const af = a.valueOf();
  const R = kind === 'one' ? '1/(1+x)' : kind === 'two' ? '1/(x+2)' : '1/(1+x^2)';
  const xa = a.eq(q(-1, 2)) ? '1/(√x(1+x))' : null;
  const f = kind === 'sq' ? `x^(${a})/(1+x^2)` : kind === 'one' ? `x^(${a})/(1+x)` : `x^(${a})/(x+2)`;
  const shown = xa && kind === 'one' ? xa : a.eq(q(-1, 2)) && kind === 'two' ? '1/(√x(x+2))' : a.eq(q(1, 2)) ? '√x/(1+x^2)' : f;
  // Factor 1 − e^(2πia), poles and residues as explicit exponentials.
  const exp2 = `e^((${piA(2, a)})i)`;
  const factorSub = `1-${exp2}`;
  const factorF = closeC(cval(factorSub));
  let poles;
  if (kind === 'one') poles = [{ z: '-1', arg: 'π', sub: `e^((${piA(1, a)})i)` }];
  else if (kind === 'two') poles = [{ z: '-2', arg: 'π', sub: `2^(${a})e^((${piA(1, a)})i)` }];
  else poles = [{ z: 'i', arg: 'π/2', sub: `e^((${piA(q(1, 2), a)})i)/(2i)` }, { z: '-i', arg: '3π/2', sub: `e^((${piA(q(3, 2), a)})i)/(-2i)` }];
  for (const p of poles) { p.val = closeC(cval(p.sub)); }
  const S = poles.map((p) => cval(p.sub)).reduce((s, v) => ({ re: s.re + v.re, im: s.im + v.im }), { re: 0, im: 0 });
  // I = 2πi S/(1 − e^(2πia)).
  const fz = cval(factorSub);
  const num = { re: -2 * Math.PI * S.im, im: 2 * Math.PI * S.re };
  const den = fz.re * fz.re + fz.im * fz.im;
  const I = (num.re * fz.re + num.im * fz.im) / den;
  const Ipi = closeT(I / Math.PI);
  const value = Ipi === '1' ? 'π' : /^(-?\d*)(√\d)?(?:\/(\d+))?$/.test(Ipi) ? Ipi.replace(/^(-?)(\d*)(√\d)?(?:\/(\d+))?$/, (m, s, n, r, d) => `${s}${n === '1' ? '' : n}π${r || ''}${d ? `/${d}` : ''}`) : `π(${Ipi})`;
  return { kind, a, af, R, f, shown, exp2, factorSub, factorF, poles, I, value, id: `${kind}:${a}` };
}

const SUB_B = [SG('branch', 'z^a, arg z ∈ ]0 ; 2π[', SB), SG('factor', 'facteur des deux bords', SB), SG('residue', 'résidus avec la coupure', SB), SG('value', 'valeur', SB)];

function branchParts(d, level) {
  const MENU = [
    { id: 'arg', label: 'Écrire z^a = |z|^a e^(ia arg z), arg z ∈ ]0 ; 2π[', valid: true },
    { id: 'fac', label: 'Bord du bas : z^a = x^a e^(2πia)', valid: true },
    { id: 'res', label: 'Résidus avec −1 = e^(iπ), i = e^(iπ/2), −i = e^(3iπ/2)', valid: true },
    { id: 'div', label: 'Diviser par le facteur (1 − e^(2πia))', valid: true },
    { id: 'principal', label: 'Prendre l\'argument principal ]−π ; π]', valid: false, rule: 'c_log_branch', why: 'La coupure est sur ℝ₊ : l\'argument doit aller de 0 à 2π, sinon z^a saute sur ℝ₋.' },
  ];
  const parts = [];
  const JF = CV(mathLabel('1 − e^(2πia)', `<mn>1</mn><mo>−</mo><msup><mi>e</mi><mrow><mn>2</mn><mi>π</mi><mi>i</mi><mi>a</mi></mrow></msup>`), d.factorF, {
    traps: { c_branch_factor: [`1+${d.exp2}`, `1-e^((${piA(1, d.a)})i)`] },
  });
  if (level >= 2) {
    parts.push({ start: JF.label, judge: JF, menu: MENU, lines: chain(JF, [d.factorSub, d.factorF]).map((t, j, a) => L(t, j === a.length - 1 ? 'Calculer' : `a = ${rd(aT(d.a))}`, 'factor', { blank: [t] })) });
  }
  d.poles.forEach((p, k) => {
    const J = CV(resLabel(p.z), p.val, {});
    parts.push({
      html: parts.length || k ? `Résidu en ${CM(p.z)} (arg = ${p.arg}) :` : '', ask: 'Res =', start: J.label, judge: J, menu: MENU,
      lines: chain(J, [p.sub, p.val]).map((t, j, a) => L(t, j === a.length - 1 ? 'Calculer' : `${rd(p.z)} = ${p.z === '-2' ? '2' : ''}e^(i${p.arg})`, 'residue', { blank: [t] })),
    });
  });
  const sumT = d.poles.length === 1 ? d.poles[0].val : d.poles.map((p) => `(${p.val})`).join('+');
  const JV = CV(mathLabel('I'), d.value, { form: 'real', traps: { c_branch_factor: [`2πi(${sumT})/(1+${d.exp2})`].filter(() => Math.abs(1 + Math.cos(2 * Math.PI * d.af)) > 1e-9) } });
  parts.push({ html: '(1 − e^(2πia)) I = 2πi Σ Res :', ask: 'I =', start: JV.label, judge: JV, menu: MENU, lines: chain(JV, [`2πi(${sumT})/(${d.factorF})`, d.value]).map((t, j, a) => L(t, j === a.length - 1 ? 'Calculer' : 'Diviser par le facteur', 'value', { blank: [t] })) });
  const intText = `int(${d.f}, x, 0, +∞)`;
  if (VERIFY.on) checkValue(d.value, evalFloat(parse(intText), {}));
  parts.push({ html: 'Conclusion :', ask: 'I =', start: intText, judge: { kind: 'definite' }, lines: [L(d.value, 'La valeur', 'value')] });
  if (level === 3) {
    parts[0].decisions = [{
      kind: 'decision', prompt: 'Quelle détermination de z^a prendre pour le trou de serrure (coupure sur ℝ₊) ?',
      options: [
        { id: 'pos', label: 'z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[', valid: true, ref: true },
        { id: 'pr', label: 'L\'argument principal, arg z ∈ ]−π ; π]', valid: false, rule: 'c_log_branch', why: 'Avec ]−π ; π], la coupure est sur ℝ₋, là où sont les pôles : le contour en trou de serrure ne marche pas.' },
      ],
    }];
  }
  return parts;
}

function branchLines(level, rng, opts = {}) {
  const d = branchData(rng, { l5: level === 5 });
  // z^a with arg z ∈ ]0 ; 2π] is e^(a(ln(−z) + iπ)) (principal Log of −z).
  for (const p of d.poles) checkRes(d.f.replace(`x^(${d.a})`, `e^((${d.a})(ln(-z)+iπ))`).replace(/x/g, 'z'), p.z, p.val);
  const parts = branchParts(d, level);
  if (level === 1) {
    parts[0].notes = [`f(z) = ${CM(d.f.replace(/x/g, 'z'))}, z^a = |z|^a e^(ia arg z) avec arg z ∈ ]0 ; 2π[ (coupure sur ℝ₊), contour en trou de serrure. Les deux bords donnent (1 − e^(2πia)) I = 2πi Σ Res, et ici 1 − e^(2πia) = ${CM(d.factorF)}.`];
  }
  return partsItem({
    skill: SB, level, prompt: `Calcule I = ∫₀^∞ ${CM(d.shown)} dx avec un contour en trou de serrure (a = ${rd(aT(d.a))}).`,
    parts, keys: [...KEYS, 'anal'], subgoals: SUB_B,
    hints: H('Trou de serrure : sur le bord du bas, l\'argument vaut 2π, donc z^a = x^a e^(2πia).', `(1 − e^(2πia)) I = 2πi (${d.poles.map((p) => `Res(f ; ${rd(p.z)})`).join(' + ')})`, d.poles.map((p) => `Res(f ; ${CM(p.z)}) = ${CM(p.sub)} = ${CM(p.val)}`).join(' ; ')),
    key: `${SB}:${level}:${d.id}`, exam: examTag(opts, 6), baits: ['c_branch_factor', 'c_log_branch'],
  });
}

// ======================================================================
// c-fourier-residues
// ======================================================================

const SF = 'c-fourier-residues';
const SUB_F = [SG('half-plane', 'demi-plan selon le signe de α', 'c-int-fourier'), SG('residues', 'résidus de e^(−iαz)f', 'c-int-fourier'), SG('value', 'f̂(α) pour α > 0', SF), SG('all-alpha', 'f̂ pour tout α', SF)];
const aE = (k) => (k === 1 ? 'α' : `${k}α`);

function ftData(rng, { l5 = false } = {}) {
  const kind = l5 ? pick(rng, ['ab', 'q4']) : pick(rng, ['one', 'one', 'ab']);
  if (kind === 'one') {
    const a = pick(rng, [1, 2, 3]);
    const f = `1/(x^2+${a * a})`;
    const res = [{ z: `-${a === 1 ? '' : a}i`, val: `e^(-${aE(a)})/(-${2 * a}i)` }];
    const F = `√(π/2)e^(-${aE(a)})${a === 1 ? '' : `/${a}`}`;
    return { kind, f, res, F, Fabs: F.replace(/α/g, '|α|'), id: `one:${a}` };
  }
  if (kind === 'ab') {
    const [a, b] = l5 ? [2, 3] : pick(rng, [[1, 2], [1, 3], [2, 3]]);
    const f = `1/((x^2+${a * a})(x^2+${b * b}))`;
    const c = b * b - a * a;
    const res = [
      { z: `-${a === 1 ? '' : a}i`, val: `e^(-${aE(a)})/(-${2 * a * c}i)` },
      { z: `-${b}i`, val: `e^(-${aE(b)})/(${2 * b * c}i)` },
    ];
    // √(2π)(b e^(−aα) − a e^(−bα))/(2ab(b² − a²))
    const F = `√(2π)(${b}e^(-${aE(a)})-${a === 1 ? '' : a}e^(-${aE(b)}))/${2 * a * b * c}`;
    return { kind, f, res, F, Fabs: F.replace(/α/g, '|α|'), id: `ab:${a}:${b}` };
  }
  // 1/(x⁴ + 4): poles 1 − i, −1 − i.
  const f = '1/(x^4+4)';
  const res = [
    { z: '1-i', val: '(-1+i)e^(-α)e^(-iα)/16' },
    { z: '-1-i', val: '(1+i)e^(-α)e^(iα)/16' },
  ];
  const F = '√(2π)e^(-α)(cos(α)+sin(α))/8';
  return { kind, f, res, F, Fabs: '√(2π)e^(-|α|)(cos(α)+sin(|α|))/8', id: 'q4' };
}

function ftParts(d, level) {
  const vars = ['α'];
  const dom = { α: [0.3, 3] };
  const MENU = [
    { id: 'down', label: 'α > 0 : fermer en bas (−2πi Σ Res)', valid: true },
    { id: 'res', label: 'Résidu de e^(−iαz)f(z) : p(z₀)/q′(z₀)', valid: true },
    { id: 'all', label: 'f paire : remplacer α par |α|', valid: true },
    { id: 'up', label: 'α > 0 : fermer en haut', valid: false, rule: 'c_jordan_alpha_sign', why: '|e^(−iαz)| = e^(α Im z) : pour α > 0, il est borné quand Im z ≤ 0.' },
    { id: 'plus', label: 'Fermer en bas avec +2πi', valid: false, rule: 'c_fourier_res_sign', why: 'Le demi-cercle du bas est parcouru dans le sens négatif : −2πi.' },
  ];
  const parts = [];
  d.res.forEach((r, k) => {
    const J = CV(resLabel(r.z, 'g'), r.val, { vars, domain: dom, form: 'value' });
    parts.push({
      html: k ? `Pôle ${CM(r.z)} :` : '', ask: 'Res =', start: J.label, judge: J, menu: MENU,
      decisions: k === 0 ? [{
        kind: 'decision', prompt: 'α > 0 : quel demi-plan ?', levels: [2, 3],
        options: [
          { id: 'down', label: 'Le demi-plan inférieur (Im z ≤ 0)', valid: true, ref: true },
          { id: 'up', label: 'Le demi-plan supérieur (Im z ≥ 0)', valid: false, rule: 'c_jordan_alpha_sign', why: '|e^(−iαz)| = e^(α Im z) : pour α > 0, il explose en haut.' },
        ],
      }] : [],
      lines: [L(r.val, `g(z) = e^(−iαz)f(z), pôle ${rd(r.z)}`, 'residues', { blank: [r.val] })],
    });
  });
  const sumT = d.res.map((r) => `(${r.val})`).join('+');
  const JV = CV(mathLabel('f̂(α)', '<mover><mi>f</mi><mo>^</mo></mover><mo>(</mo><mi>α</mi><mo>)</mo>'), d.F, { vars, domain: dom, form: 'value', traps: { c_fourier_res_sign: [`(1/√(2π))(2πi)(${sumT})`] } });
  parts.push({ html: 'Pour α > 0 :', ask: 'f̂(α) =', start: JV.label, judge: JV, menu: MENU, lines: chain(JV, [`(1/√(2π))(-2πi)(${sumT})`, d.F]).map((t, j, a) => L(t, j === a.length - 1 ? 'Simplifier' : '(1/√(2π)) · (−2πi) Σ Res', 'value', { blank: [t] })) });
  const JT = { kind: 'transform', transform: 'fourier', v: 'x', s: 'α', f: d.f, F: d.Fabs, dir: 'forward' };
  parts.push({ html: `f est paire, donc f̂ aussi : pour tout α,`, ask: 'f̂(α) =', start: 'f̂(α)', judge: JT, menu: MENU, lines: [L(d.Fabs, 'Remplacer α par |α|', 'all-alpha')] });
  return parts;
}

function ftVerify(d) {
  if (!VERIFY.on) return;
  for (const al of [0.7, 1.9]) {
    for (const r of d.res) checkRes(`e^(-iαz)${d.f.replace(/x/g, 'z').slice(1)}`, r.z, r.val, { α: al });
    const want = fourierAt(parse(d.f, { vars: ['x'] }), 'x', al);
    checkValue(d.F, want, { α: al });
  }
}

function ftLines(level, rng, opts = {}) {
  const d = ftData(rng, { l5: level === 5 });
  ftVerify(d);
  const parts = ftParts(d, level);
  if (level === 1) parts[0].notes = ['Pour α > 0, |e^(−iαz)| = e^(α Im z) ≤ 1 quand Im z ≤ 0 : on ferme en bas, le contour est parcouru dans le sens négatif, ∫ = −2πi Σ Res. Pour α < 0, on conclut par parité.'];
  return partsItem({
    skill: SF, level, prompt: `Calcule la transformée de Fourier f̂(α) = (1/√(2π)) ∫_ℝ f(x)e^(−iαx) dx de f(x) = ${CM(d.f)} avec les résidus.`,
    parts, keys: [...KEYS, 'transf'], subgoals: SUB_F,
    hints: H('α > 0 : |e^(−iαz)| ≤ 1 quand Im z ≤ 0, on ferme en bas avec −2πi.', `f̂(α) = (1/√(2π)) · (−2πi) (${d.res.map((r) => `Res(g ; ${rd(r.z)})`).join(' + ')})`, d.res.map((r) => `Res(g ; ${CM(r.z)}) = ${CM(r.val)}`).join(' ; ')),
    key: `${SF}:${level}:${d.id}`, exam: examTag(opts, 5), baits: ['c_fourier_res_sign', 'c_jordan_alpha_sign'],
  });
}

// ======================================================================
// c-conformal (optional)
// ======================================================================

const SC = 'c-conformal';
const SUB_C = [SG('points', 'images de points', SC), SG('image', 'image d\'une droite ou d\'un cercle', SC)];
const HOMOS = [
  [cq(1), cq(0, -1), cq(1), cq(0, 1)], // (z − i)/(z + i)
  [cq(1), cq(1), cq(-1), cq(1)], // (1 + z)/(1 − z)
  [cq(0), cq(1), cq(1), cq(0)], // 1/z
  [cq(1), cq(-1), cq(1), cq(1)], // (z − 1)/(z + 1)
  [cq(1), cq(0, 1), cq(1), cq(0, -1)], // (z + i)/(z − i)
  [cq(2), cq(0), cq(1), cq(1)], // 2z/(z + 1)
  [cq(0, 1), cq(1), cq(1), cq(0, 1)], // (iz + 1)/(z + i)
  [cq(1), cq(0), cq(1), cq(-2)], // z/(z − 2)
];
const homT = ([a, b, c, d]) => {
  const lin = (x, y) => {
    const xz = x.isZero() ? '' : x.eq(1) ? 'z' : x.eq(-1) ? '-z' : `${cP(x)}z`;
    if (y.isZero()) return xz || '0';
    if (!xz) return cT(y);
    const yt = cT(y);
    if (xz.startsWith('-') && !yt.startsWith('-')) return `${yt}${xz}`;
    return yt.startsWith('-') ? `${xz}${yt}` : `${xz}+${yt}`;
  };
  return { num: lin(a, b), den: lin(c, d) };
};
const POINTS = [{ z: cq(0), t: '0' }, { z: cq(1), t: '1' }, { z: cq(0, 1), t: 'i' }, { z: cq(-1), t: '-1' }, { z: null, t: '∞' }];

function imageOf(h, p) {
  const [a, b, c, d] = h;
  if (p.z === null) return c.isZero() ? null : a.div(c);
  const den = c.mul(p.z).add(d);
  if (den.isZero()) return null;
  return a.mul(p.z).add(b).div(den);
}
// The termwise division of c_mobius_point: (n₁ + n₂i)/(d₁ + d₂i) read as n₁/d₁ + (n₂/d₂)i.
function termwise(h, p) {
  if (p.z === null) return null;
  const [a, b, c, d] = h;
  const N = a.mul(p.z).add(b);
  const D = c.mul(p.z).add(d);
  if (D.re.n === 0 || D.im.n === 0 || N.im.n === 0) return null;
  return cq(N.re.div(D.re), N.im.div(D.im));
}

// (num)/(den) with brackets only around sums.
const br = (t) => (/[+-]/.test(t.slice(1)) ? `(${t})` : t);
const wT = (num, den) => `${br(num)}/${br(den)}`;
// z replaced by t: bare after an operator or a bracket, between brackets after a factor.
function subZ(text, t) {
  const simple = /^[0-9]+$|^i$/.test(t);
  return text.replace(/(^|[(+\-*/])z/g, (m, pre) => `${pre}${simple ? t : `(${t})`}`).replace(/z/g, `(${t})`);
}

function confPoints(level, rng, opts = {}) {
  const h = pick(rng, HOMOS);
  const { num, den } = homT(h);
  const w = wT(num, den);
  const pts = rng.shuffle(POINTS).filter((p) => imageOf(h, p)).slice(0, 3);
  const parts = pts.map((p, k) => {
    const img = imageOf(h, p);
    const wrong = termwise(h, p);
    const J = CV(mathLabel(`w(${p.t})`, `<mi>w</mi><mo>(</mo>${p.t === '∞' ? '<mi>∞</mi>' : inner(p.t)}<mo>)</mo>`), cT(img), wrong && !wrong.eq(img) ? { traps: { c_mobius_point: [cT(wrong)] } } : {});
    const sub = p.z === null ? null : `(${subZ(num, p.t)})/(${subZ(den, p.t)})`;
    return {
      html: k ? (p.t === '∞' ? 'La limite quand z → ∞ :' : `Image de ${CM(p.t)} :`) : '', ask: `w(${rd(p.t)}) =`, start: J.label, judge: J,
      menu: [{ id: 'sub', label: 'Remplacer z', valid: true }, { id: 'conj', label: 'Multiplier par le conjugué du dénominateur', valid: true }, { id: 'tw', label: 'Diviser parties réelles et imaginaires séparément', valid: false, rule: 'c_mobius_point', why: '(a + bi)/(c + di) ≠ a/c + (b/d)i : multiplie par le conjugué.' }],
      lines: chain(J, [sub, cT(img)]).map((t, j, a) => L(t, j === a.length - 1 ? (p.t === '∞' ? 'w(∞) = a/c' : 'Simplifier') : 'Remplacer z', 'points', { blank: [t] })),
    };
  });
  if (level === 3) {
    parts[0].decisions = [{
      kind: 'decision', prompt: 'L\'image d\'une droite ou d\'un cercle par une homographie est :',
      options: [
        { id: 'cd', label: 'Un cercle ou une droite', valid: true, ref: true },
        { id: 'conic', label: 'Une conique quelconque', valid: false, why: 'Une homographie envoie les cercles et les droites sur des cercles et des droites.' },
      ],
    }];
  }
  return partsItem({
    skill: SC, level, prompt: `Soit w = ${CM(w)}. Calcule les images de ${pts.map((p) => CM(p.t === '∞' ? '∞' : p.t)).join(', ')}.`,
    parts, keys: KEYS, subgoals: SUB_C,
    hints: H('Remplace z, puis multiplie par le conjugué du dénominateur. w(∞) = a/c.', `w(${rd(pts[0].t)}) = ${pts[0].z === null ? 'a/c' : CM(`(${subZ(num, pts[0].t)})/(${subZ(den, pts[0].t)})`)}`, `w(${rd(pts[0].t)}) = ${CM(cT(imageOf(h, pts[0])))}`),
    key: `${SC}:${level}:${w}:${pts.map((p) => p.t).join()}`, exam: examTag(opts), baits: ['c_mobius_point'],
  });
}

// Level 4: the homography that sends three points to three points.
function confFind(level, rng) {
  const h = pick(rng, HOMOS);
  const { num, den } = homT(h);
  const w = wT(num, den);
  const pts = POINTS.filter((p) => imageOf(h, p)).slice(0, 3);
  const J = CV(mathLabel('w(z)'), w, { vars: ['z'], domain: { z: [-3, 3] }, form: 'ratz' });
  const desc = pts.map((p) => `${CM(p.t === '∞' ? '∞' : p.t)} ↦ ${CM(cT(imageOf(h, p)))}`).join(', ');
  return partsItem({
    skill: SC, level, prompt: `Trouve l'homographie w = (az + b)/(cz + d) qui envoie ${desc}.`,
    parts: [{ start: J.label, judge: J, lines: [L(w, 'Trois conditions, a, b, c, d à un facteur près', 'points')] }],
    keys: KEYS, subgoals: SUB_C,
    hints: H('Une homographie est fixée par trois points, a, b, c, d à un facteur près. Si 0 ↦ w₀, alors b/d = w₀ ; si ∞ ↦ w∞, alors a/c = w∞.', 'Un point envoyé sur 0 annule le numérateur, un point envoyé sur ∞ annule le dénominateur ; sinon, résous les trois équations w(zₖ) = wₖ.', `w = ${CM(w)}`),
    key: `${SC}:4:${w}`,
  });
}

// Images of lines and regions (multiple choice), levels 2, 5 and the exam.
const IMAGES = [
  { w: '(z-i)/(z+i)', what: 'l\'axe réel', right: 'le cercle |w| = 1', wrongs: ['la droite Re w = 0', 'le cercle |w − 1| = 1', 'l\'axe réel'] },
  { w: '(z-i)/(z+i)', what: 'du demi-plan Im z > 0', right: 'le disque |w| < 1', wrongs: ['le demi-plan Im w > 0', 'l\'extérieur |w| > 1', 'le demi-plan Re w > 0'] },
  { w: 'e^z', what: 'de la bande 0 < Im z < π', right: 'le demi-plan Im w > 0', wrongs: ['le disque |w| < 1', 'la bande 0 < Im w < π', 'le demi-plan Re w > 0'] },
  { w: 'e^z', what: 'de la bande −π/2 < Im z < π/2', right: 'le demi-plan Re w > 0', wrongs: ['le demi-plan Im w > 0', 'le disque |w| < 1', 'tout ℂ privé de 0'] },
  { w: '1/z', what: 'de la droite Re z = 1', right: 'le cercle |w − 1/2| = 1/2', wrongs: ['la droite Re w = 1', 'le cercle |w| = 1', 'la droite Im w = 1'] },
  { w: '(1+z)/(1-z)', what: 'du disque |z| < 1', right: 'le demi-plan Re w > 0', wrongs: ['le disque |w| < 1', 'le demi-plan Im w > 0', 'l\'extérieur |w| > 1'] },
  { w: 'z^2', what: 'du premier quadrant (Re z > 0, Im z > 0)', right: 'le demi-plan Im w > 0', wrongs: ['le premier quadrant', 'le demi-plan Re w > 0', 'le disque |w| < 1'] },
  { w: '1/z', what: 'du cercle |z − 1| = 1 (privé de 0)', right: 'la droite Re w = 1/2', wrongs: ['le cercle |w − 1| = 1', 'la droite Re w = 1', 'le cercle |w| = 1/2'] },
];
function confImage(level, rng, opts = {}) {
  const c = pick(rng, IMAGES);
  return choice({
    skill: SC, level, key: `${SC}:img:${c.w}:${c.what}`, exam: examTag(opts, 2),
    prompt: `L'image ${c.what} par w = ${CM(c.w)} est :`,
    right: c.right, wrongs: c.wrongs.map((x) => ({ html: x, rule: null })),
    solution: [{ html: `Images de trois points du bord (et d'un point intérieur) : ${c.right}.`, note: '' }],
    expectedSec: 90,
  }, rng);
}

// ======================================================================

export const GEN = {
  [SB]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return asProblem(branchLines(4, rng, opts), 6);
    return branchLines(level, rng, opts);
  },
  [SF]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'open') return asProblem(ftLines(4, rng, opts), 5);
    return ftLines(level, rng, opts);
  },
  [SC]: (level, rng, profile, opts = {}) => {
    if (opts.exam === 'mcq') return confImage(4, rng, opts);
    if (level === 5) return confImage(5, rng, opts);
    if (level === 4) return rng.chance(0.6) ? confFind(4, rng) : confPoints(4, rng, opts);
    return confPoints(level, rng, opts);
  },
};

void mcq; void opt; void evalComplex;
